const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050816);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0.8, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
const material = new THREE.MeshStandardMaterial({
  color: 0x4cc9f0,
  metalness: 0.2,
  roughness: 0.35
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const grid = new THREE.GridHelper(10, 10, 0x3b82f6, 0x1e293b);
grid.position.y = -1.4;
scene.add(grid);

const axes = new THREE.AxesHelper(2);
scene.add(axes);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
keyLight.position.set(3, 4, 5);
scene.add(keyLight);

const fillLight = new THREE.PointLight(0x60a5fa, 18, 20);
fillLight.position.set(-3, 1, 2);
scene.add(fillLight);

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.015;

  renderer.render(scene, camera);
}

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener("resize", handleResize);

animate();
