const canvas = document.querySelector(".webgl");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1220);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 4.5, 10);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.add(new THREE.AmbientLight(0xffffff, 0.45));

const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
keyLight.position.set(4, 7, 5);
keyLight.castShadow = true;
scene.add(keyLight);

const rimLight = new THREE.PointLight(0x60a5fa, 1.2, 18);
rimLight.position.set(-5, 4, -3);
scene.add(rimLight);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    color: 0x1f2937,
    roughness: 0.92,
    metalness: 0.08,
  })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const leftMaterial = new THREE.MeshStandardMaterial({
  color: 0xf97316,
  roughness: 0.2,
  metalness: 0.8,
});

const centerMaterial = new THREE.MeshStandardMaterial({
  color: 0x22c55e,
  roughness: 0.58,
  metalness: 0.15,
});

const rightMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xbfe6ff,
  roughness: 0.02,
  transmission: 0.92,
  transparent: true,
  thickness: 1.1,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
});

const leftMesh = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.7, 0.24, 120, 18),
  leftMaterial
);
leftMesh.position.set(-3.2, 1.7, 0);
leftMesh.castShadow = true;
scene.add(leftMesh);

const centerMesh = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  centerMaterial
);
centerMesh.position.set(0, 1.4, 0);
centerMesh.castShadow = true;
scene.add(centerMesh);

const rightMesh = new THREE.Mesh(
  new THREE.SphereGeometry(1.15, 48, 48),
  rightMaterial
);
rightMesh.position.set(3.2, 1.3, 0);
rightMesh.castShadow = true;
scene.add(rightMesh);

const ring = new THREE.Mesh(
  new THREE.TorusGeometry(5.5, 0.05, 12, 140),
  new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.5,
    side: THREE.FrontSide,
  })
);
ring.rotation.x = Math.PI / 2;
ring.position.y = 2.2;
scene.add(ring);

/*
Practice roadmap:
1. Change leftMaterial roughness to 0.75 and metalness to 0.1.
2. Replace centerMaterial with MeshPhongMaterial and add shininess/specular.
3. Turn rightMaterial transmission up to 1 and thickness to 2.5.
4. Enable wireframe on one material.
5. Change ring material side from FrontSide to DoubleSide.
6. Add a new mesh with MeshToonMaterial or MeshNormalMaterial.
*/

function animate() {
  leftMesh.rotation.x += 0.01;
  leftMesh.rotation.y += 0.008;
  centerMesh.rotation.y += 0.01;
  rightMesh.rotation.y += 0.012;
  ring.rotation.z += 0.003;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
