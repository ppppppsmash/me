import * as THREE from 'three'

let isRainy = false

export function initWindy() {
  if (typeof window === 'undefined' || isRainy) {
    return
  }

  isRainy = true
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 20
  camera.position.y = 10

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

  const raindropGeometry = new THREE.BufferGeometry()
  const vertices = []
  vertices.push(0, 0, 0)
  vertices.push(0, -2, 0)

  raindropGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

  const rainCount = 10000 // より多くの雨滴を追加します
  for (let i = 0; i < rainCount; i++) {
    const raindropGeometry = new THREE.BufferGeometry()

    raindropGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    const pos = new THREE.Vector3(Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100)

    const raindropMaterial = new THREE.LineBasicMaterial({
      color: 0xAAAAAA, // 色
      transparent: true,
      opacity: (pos.z + 100) / 200 * 0.1 + 0.05,
    })

    const raindrop = new THREE.Line(raindropGeometry, raindropMaterial)

    raindrop.position.copy(pos)

    // より強い風を追加します
    const windForce = new THREE.Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1)
    raindrop.userData.velocity = new THREE.Vector3(
      Math.random() * 0.5 - 0.25 + windForce.x, // X方向の速度
      (Math.random() * 0.5 - 1) - 1.5, // Y方向の速度
      Math.random() * 0.5 - 0.25 + windForce.z, // Z方向の速度
    )

    scene.add(raindrop)
  }

  function animate() {
    requestAnimationFrame(animate)
    scene.traverse((object) => {
      if (object instanceof THREE.Line) {
        object.position.add(object.userData.velocity)
        // 画面外に出たら再配置します
        if (object.position.y < -100) {
          object.position.copy(new THREE.Vector3(Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100))
        }
      }
    })
    renderer.render(scene, camera)
  }
  animate()
}
