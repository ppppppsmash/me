import * as THREE from "three";

let isInitialized = false;
let animationFrameId: number;
let resizeListener: () => void;

interface Petal {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  angularVelocity: THREE.Vector3;
  phase: number;
  swayAmplitude: number;
  swayFrequency: number;
  tumbleAxis: THREE.Vector3;
  tumbleSpeed: number;
  airResistance: number;
  size: number;
}

function createPetalGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();

  // Realistic sakura petal shape - slightly asymmetric with a notch at the tip
  shape.moveTo(0, -0.5);
  // Right side curve
  shape.bezierCurveTo(0.25, -0.3, 0.45, 0.1, 0.35, 0.4);
  // Top right curve toward notch
  shape.bezierCurveTo(0.28, 0.52, 0.1, 0.55, 0.05, 0.48);
  // Notch at top center
  shape.bezierCurveTo(0.02, 0.42, -0.02, 0.42, -0.05, 0.48);
  // Top left curve from notch
  shape.bezierCurveTo(-0.1, 0.55, -0.28, 0.52, -0.35, 0.4);
  // Left side curve
  shape.bezierCurveTo(-0.45, 0.1, -0.25, -0.3, 0, -0.5);

  const geometry = new THREE.ShapeGeometry(shape, 8);

  // Add subtle curvature to the petal by displacing z based on position
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const distFromCenter = Math.sqrt(x * x + y * y);
    // Slight bowl/curl shape
    positions.setZ(i, -distFromCenter * distFromCenter * 0.3 + x * 0.08);
  }
  geometry.computeVertexNormals();

  return geometry;
}

function createPetal(
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  spawnArea: { width: number; height: number }
): Petal {
  const mesh = new THREE.Mesh(geometry, material);
  const size = 0.15 + Math.random() * 0.12;
  mesh.scale.set(size, size, size);

  // Spawn from top, spread across width
  mesh.position.set(
    (Math.random() - 0.5) * spawnArea.width,
    spawnArea.height * 0.5 + Math.random() * 5,
    (Math.random() - 0.5) * 10
  );

  // Random initial rotation
  mesh.rotation.set(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  );

  return {
    mesh,
    velocity: new THREE.Vector3(
      (Math.random() - 0.3) * 0.02, // slight rightward drift
      -(0.008 + Math.random() * 0.012), // fall speed
      (Math.random() - 0.5) * 0.005
    ),
    angularVelocity: new THREE.Vector3(
      (Math.random() - 0.5) * 0.02,
      (Math.random() - 0.5) * 0.02,
      (Math.random() - 0.5) * 0.015
    ),
    phase: Math.random() * Math.PI * 2,
    swayAmplitude: 0.003 + Math.random() * 0.006,
    swayFrequency: 0.5 + Math.random() * 1.0,
    tumbleAxis: new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize(),
    tumbleSpeed: 0.01 + Math.random() * 0.03,
    airResistance: 0.98 + Math.random() * 0.015,
    size,
  };
}

function resetPetal(petal: Petal, spawnArea: { width: number; height: number }) {
  petal.mesh.position.set(
    (Math.random() - 0.5) * spawnArea.width,
    spawnArea.height * 0.5 + Math.random() * 3,
    (Math.random() - 0.5) * 10
  );
  petal.velocity.set(
    (Math.random() - 0.3) * 0.02,
    -(0.008 + Math.random() * 0.012),
    (Math.random() - 0.5) * 0.005
  );
  petal.phase = Math.random() * Math.PI * 2;
  petal.angularVelocity.set(
    (Math.random() - 0.5) * 0.02,
    (Math.random() - 0.5) * 0.02,
    (Math.random() - 0.5) * 0.015
  );
}

export function initSakura() {
  if (typeof window === "undefined" || isInitialized) return;
  isInitialized = true;

  const scene = new THREE.Scene();
  const isMobile = window.innerWidth < 768;
  const camera = new THREE.PerspectiveCamera(
    isMobile ? 80 : 60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = isMobile ? 16 : 20;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = "fixed";
  renderer.domElement.style.top = "0";
  renderer.domElement.style.left = "0";
  renderer.domElement.style.zIndex = "-10";
  renderer.domElement.style.pointerEvents = "none";
  document.body.appendChild(renderer.domElement);

  resizeListener = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", resizeListener);

  // Soft ambient light + directional for subtle shading
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xfff0f0, 0.5);
  dirLight.position.set(5, 10, 5);
  scene.add(dirLight);

  const petalGeometry = createPetalGeometry();

  const petalColors = [0xffb7c5, 0xffc1cc, 0xffa8b8, 0xffd1dc, 0xffcad4];
  const materials = petalColors.map(
    (color) =>
      new THREE.MeshStandardMaterial({
        color,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        roughness: 0.8,
        metalness: 0.0,
      })
  );

  const petalCount = 120;
  const halfFov = (camera.fov * Math.PI) / 360;
  const visibleHeight = camera.position.z * Math.tan(halfFov) * 2;
  const spawnArea = {
    width: visibleHeight * camera.aspect * 2.2,
    height: visibleHeight,
  };

  const petals: Petal[] = [];
  for (let i = 0; i < petalCount; i++) {
    const material = materials[Math.floor(Math.random() * materials.length)];
    const petal = createPetal(petalGeometry, material, spawnArea);
    // Spread initial positions across the full visible area
    petal.mesh.position.y = (Math.random() - 0.5) * spawnArea.height * 1.2;
    scene.add(petal.mesh);
    petals.push(petal);
  }

  // Wind parameters that change over time
  let time = 0;
  const windBase = new THREE.Vector3(0.003, 0, 0); // gentle constant wind

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    time += 0.01;

    // Gusting wind effect
    const gustStrength = Math.sin(time * 0.3) * 0.5 + 0.5;
    const gustX = Math.sin(time * 0.7) * 0.004 * gustStrength;
    const gustZ = Math.cos(time * 0.5) * 0.002 * gustStrength;

    petals.forEach((petal) => {
      // Gravity
      petal.velocity.y -= 0.00003;

      // Wind force
      petal.velocity.x += windBase.x * 0.1 + gustX * 0.05;
      petal.velocity.z += gustZ * 0.05;

      // Air resistance (dampening)
      petal.velocity.multiplyScalar(petal.airResistance);

      // Sinusoidal sway (simulates leaf flutter)
      petal.phase += petal.swayFrequency * 0.02;
      const swayForce = Math.sin(petal.phase) * petal.swayAmplitude;
      petal.velocity.x += swayForce;
      petal.velocity.y += Math.cos(petal.phase * 1.3) * petal.swayAmplitude * 0.3;

      // Apply velocity
      petal.mesh.position.add(petal.velocity);

      // Tumble rotation - petals flip and spin realistically
      const q = new THREE.Quaternion();
      q.setFromAxisAngle(petal.tumbleAxis, petal.tumbleSpeed);
      petal.mesh.quaternion.multiply(q);

      // Additional flutter rotation
      petal.mesh.rotation.z += petal.angularVelocity.z;

      // Reset when out of bounds
      if (
        petal.mesh.position.y < -spawnArea.height * 0.7 ||
        petal.mesh.position.x > spawnArea.width * 0.7 ||
        petal.mesh.position.x < -spawnArea.width * 0.7
      ) {
        resetPetal(petal, spawnArea);
      }
    });

    renderer.render(scene, camera);
  }

  animate();
}

export function cleanupSakura() {
  if (!isInitialized) return;

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  if (resizeListener) {
    window.removeEventListener("resize", resizeListener);
  }

  const canvases = document.querySelectorAll("canvas");
  canvases.forEach((canvas) => {
    if (canvas.style.zIndex === "-10") {
      canvas.remove();
    }
  });

  isInitialized = false;
}
