import * as THREE from 'three'

let isSnowy = false

export function initSnowy() {
  if (typeof window === 'undefined' || isSnowy) {
    return
  }

  isSnowy = true
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 20

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  })

  renderer.setClearColor(0x000000, 0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.domElement.style.position = 'fixed'
  renderer.domElement.style.top = '0'
  renderer.domElement.style.left = '0'
  renderer.domElement.style.zIndex = '-10'
  document.body.appendChild(renderer.domElement)
  // on resize
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  }, false)

  const snowCount = 180 // 密度をさらに減らす
  const snowflakes: THREE.Mesh[] = []
  const snowflakeGeometry = new THREE.SphereGeometry(0.05, 32, 32)
  const snowflakeMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF })

  for (let i = 0; i < snowCount; i++) {
    const snowflake = new THREE.Mesh(snowflakeGeometry, snowflakeMaterial)
    snowflake.position.set(Math.random() * 40 - 20, Math.random() * 20 + 10, Math.random() * 20 - 10) // y方向の範囲を上に広げる
    snowflake.userData.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.01, // ランダムな x 軸方向の速度を設定
      -0.01 - Math.random() * 0.03,
      0
    )
    scene.add(snowflake)
    snowflakes.push(snowflake)
  }

  function animate() {
    requestAnimationFrame(animate)

    snowflakes.forEach((snowflake) => {
      snowflake.userData.velocity.y -= 0.0001 // 重力
      snowflake.position.add(snowflake.userData.velocity)

      // 画面外に出たらランダムな位置に戻す
      if (snowflake.position.x > 20 || snowflake.position.x < -20 || snowflake.position.y < -10) {
        snowflake.position.set(Math.random() * 40 - 20, 20, Math.random() * 20 - 10) // x方向の範囲を広げてみる
        snowflake.userData.velocity.set(
          (Math.random() - 0.5) * 0.01, // ランダムな x 軸方向の速度を調整
          -0.01 - Math.random() * 0.03,
          0
        )
      }
    })

    renderer.render(scene, camera)
  }

  animate()
}
