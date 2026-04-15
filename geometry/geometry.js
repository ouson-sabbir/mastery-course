const canvas = document.querySelector("canvas");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020617);

const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 2.5, 10);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(4, 5, 6);
scene.add(directionalLight);

const material = new THREE.MeshNormalMaterial();

const shapes = [
  { geometry: new THREE.BoxGeometry(1.4, 1.4, 1.4, 4, 4, 4), x: -4.5 },
  { geometry: new THREE.SphereGeometry(1, 32, 32), x: -1.5 },
  { geometry: new THREE.ConeGeometry(1, 2, 32, 4), x: 1.5 },
  { geometry: new THREE.TorusKnotGeometry(0.7, 0.25, 100, 16), x: 4.5 }
];

const gallery = new THREE.Group();
scene.add(gallery);

shapes.forEach((item, index) => {
  const mesh = new THREE.Mesh(item.geometry, material);
  mesh.position.set(item.x, 1.2, 0);
  mesh.rotation.x = 0.35;
  mesh.userData.spinSpeed = 0.01 + index * 0.004;
  gallery.add(mesh);
});

const planeGeometry = new THREE.PlaneGeometry(10, 3.5, 40, 20);
const positions = planeGeometry.attributes.position;

for (let i = 0; i < positions.count; i += 1) {
  const x = positions.getX(i);
  const wave = Math.sin(x * 1.4) * 0.22;
  positions.setZ(i, wave);
}

positions.needsUpdate = true;
planeGeometry.computeVertexNormals();

const plane = new THREE.Mesh(
  planeGeometry,
  new THREE.MeshStandardMaterial({
    color: 0x1d4ed8,
    wireframe: true
  })
);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -1.2;
scene.add(plane);

function animate() {
  gallery.children.forEach((mesh) => {
    mesh.rotation.y += mesh.userData.spinSpeed;
  });

  renderer.render(scene, camera);
}

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener("resize", handleResize);
renderer.setAnimationLoop(animate);
