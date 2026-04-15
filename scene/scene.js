const canvas = document.querySelector("canvas");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a);
scene.fog = new THREE.Fog(0x0f172a, 8, 18);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 3, 8);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
directionalLight.position.set(4, 6, 5);
scene.add(directionalLight);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(18, 18),
  new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.95 })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = -1.8;
scene.add(floor);

const pedestal = new THREE.Group();
pedestal.name = "pedestal";
scene.add(pedestal);

const base = new THREE.Mesh(
  new THREE.CylinderGeometry(2.2, 2.2, 0.6, 32),
  new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.75 })
);
base.position.y = -1.2;
pedestal.add(base);

const cubeGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
const colors = [0x22c55e, 0x38bdf8, 0xf97316];

colors.forEach((color, index) => {
  const cube = new THREE.Mesh(
    cubeGeometry,
    new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.2 })
  );

  cube.position.set((index - 1) * 2.4, 0.2, 0);
  cube.userData.spinSpeed = 0.01 + index * 0.005;
  pedestal.add(cube);
});

const tempSphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.35, 24, 24),
  new THREE.MeshStandardMaterial({ color: 0xf8fafc })
);
tempSphere.position.set(0, 2.6, 0);
scene.add(tempSphere);
scene.remove(tempSphere);

function animate() {
  pedestal.rotation.y += 0.003;

  scene.traverse((child) => {
    if (child.isMesh && child.userData.spinSpeed) {
      child.rotation.x += child.userData.spinSpeed;
      child.rotation.y += child.userData.spinSpeed;
    }
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
