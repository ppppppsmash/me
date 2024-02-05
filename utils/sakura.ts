import * as THREE from 'three';

let isSakura = false;

export function initSakura() {
  if (typeof window === 'undefined' || isSakura) {
    return;
  }

  isSakura = true;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 20;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });

  renderer.setClearColor(0x000000, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.zIndex = '-10';
  document.body.appendChild(renderer.domElement);
  // on resize
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }, false);

  const sakuraCount = 100; // 桜の花びらの数
  const sakuraPetals: THREE.Mesh[] = [];
  
  // 花びらの形状を作成する
  const petalShape = new THREE.Shape();
  petalShape.moveTo(0, 0);
  petalShape.quadraticCurveTo(0.5, -0.5, 0.5, -1);
  petalShape.quadraticCurveTo(0.5, -1.5, 0, -2);
  petalShape.quadraticCurveTo(-0.5, -1.5, -0.5, -1);
  petalShape.quadraticCurveTo(-0.5, -0.5, 0, 0);
  
  // 花びらの形状からジオメトリを生成
  const sakuraPetalGeometry = new THREE.ShapeGeometry(petalShape);
  sakuraPetalGeometry.scale(0.2, 0.2, 0.2); // 花びらのサイズを調整
  const sakuraPetalMaterial = new THREE.MeshBasicMaterial({ color: 0xFFCCCC }); // 桜の花びらの色を設定

  for (let i = 0; i < sakuraCount; i++) {
    const sakuraPetal = new THREE.Mesh(sakuraPetalGeometry, sakuraPetalMaterial);
    sakuraPetal.position.set(Math.random() * 40 - 20, Math.random() * 20 + 10, Math.random() * 20 - 10);
    sakuraPetal.userData.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.01,
      -0.01 - Math.random() * 0.03,
      0
    );
    sakuraPetal.userData.windForce = new THREE.Vector3((Math.random() - 0.5) * 0.001, 0, 0); // ランダムな風の力を追加
    sakuraPetal.userData.randomOffset = Math.random() * 0.02 - 0.01; // ランダムな左右の移動量を設定
    sakuraPetal.userData.rotationSpeed = Math.random() * 0.1 - 0.05; // ランダムな回転速度を設定
    scene.add(sakuraPetal);
    sakuraPetals.push(sakuraPetal);
  }

  function animate() {
    requestAnimationFrame(animate);

    sakuraPetals.forEach((sakuraPetal) => {
      sakuraPetal.userData.velocity.y -= 0.0001;
      sakuraPetal.userData.velocity.add(sakuraPetal.userData.windForce); // 風の力を花びらに加える
      sakuraPetal.position.add(sakuraPetal.userData.velocity);
      sakuraPetal.position.x += sakuraPetal.userData.randomOffset; // ランダムな左右の移動量を加える
      sakuraPetal.rotation.z += sakuraPetal.userData.rotationSpeed; // 回転を加える

      if (sakuraPetal.position.x > 20 || sakuraPetal.position.x < -20 || sakuraPetal.position.y < -10) {
        sakuraPetal.position.set(Math.random() * 40 - 20, 20, Math.random() * 20 - 10);
        sakuraPetal.userData.velocity.set(
          (Math.random() - 0.5) * 0.01,
          -0.01 - Math.random() * 0.03,
          0
        );
        sakuraPetal.userData.windForce.x = (Math.random() - 0.5) * 0.001; // 風の力のx成分をランダムに再設定
        sakuraPetal.userData.randomOffset = Math.random() * 0.02 - 0.01; // ランダムな左右の移動量を再設定
        sakuraPetal.userData.rotationSpeed = Math.random() * 0.1 - 0.05; // ランダムな回転速度を再設定
      }
    });

    renderer.render(scene, camera);
  }

  animate();
}
