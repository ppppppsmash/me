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

  const sakuraCount = 100;
  const sakuraPetals: THREE.Mesh[] = [];

  const petalShape = new THREE.Shape();
  petalShape.moveTo(0, 0); // 下のとがった部分

  // 右半分のハート
  petalShape.bezierCurveTo(2, -3, 6, 2, 0, 6);

  // 左半分のハート
  petalShape.bezierCurveTo(-6, 2, -2, -3, 0, 0);
  // 花びらの形状からジオメトリを生成
  const sakuraPetalGeometry = new THREE.ShapeGeometry(petalShape);
  // sakuraPetalGeometry.scale(0.15, 0.15, 0.15);
  sakuraPetalGeometry.scale(0.05, 0.07, 0.05); // 縦を少し長めに
  const sakuraPetalMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xFFB6C1,
    transparent: true,
    opacity: 0.8
  });

  for (let i = 0; i < sakuraCount; i++) {
    const sakuraPetal = new THREE.Mesh(sakuraPetalGeometry, sakuraPetalMaterial);
    // 右上から開始するように初期位置を設定
    sakuraPetal.position.set(
      Math.random() * 10 + 10,  // x座標: 10から20の範囲
      Math.random() * 10 + 20,  // y座標: 20から30の範囲
      Math.random() * 20 - 10   // z座標: -10から10の範囲
    );
    sakuraPetal.userData.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.005,  // 左右の動きを小さく
      -0.005 - Math.random() * 0.01,  // 落下速度を遅く
      0
    );
    sakuraPetal.userData.windForce = new THREE.Vector3(
      (Math.random() - 0.5) * 0.0005,  // 風の力を小さく
      0,
      0
    );
    sakuraPetal.userData.randomOffset = Math.random() * 0.01 - 0.005;  // 左右の揺れを小さく
    sakuraPetal.userData.rotationSpeed = Math.random() * 0.05 - 0.025;  // 回転速度を遅く
    scene.add(sakuraPetal);
    sakuraPetals.push(sakuraPetal);
  }

  function animate() {
    requestAnimationFrame(animate);

    sakuraPetals.forEach((sakuraPetal) => {
      sakuraPetal.userData.velocity.y -= 0.00005;  // 重力の影響を小さく
      sakuraPetal.userData.velocity.add(sakuraPetal.userData.windForce);
      sakuraPetal.position.add(sakuraPetal.userData.velocity);
      sakuraPetal.position.x += sakuraPetal.userData.randomOffset;
      sakuraPetal.rotation.z += sakuraPetal.userData.rotationSpeed;

      // 画面外に出た場合のリセット位置を右上に変更
      if (sakuraPetal.position.x > 20 || sakuraPetal.position.x < -20 || sakuraPetal.position.y < -10) {
        sakuraPetal.position.set(
          Math.random() * 10 + 10,
          20,
          Math.random() * 20 - 10
        );
        sakuraPetal.userData.velocity.set(
          (Math.random() - 0.5) * 0.005,
          -0.005 - Math.random() * 0.01,
          0
        );
        sakuraPetal.userData.windForce.x = (Math.random() - 0.5) * 0.0005;
        sakuraPetal.userData.randomOffset = Math.random() * 0.01 - 0.005;
        sakuraPetal.userData.rotationSpeed = Math.random() * 0.05 - 0.025;
      }
    });

    renderer.render(scene, camera);
  }

  animate();
}
