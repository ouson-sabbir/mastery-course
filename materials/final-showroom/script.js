const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x08111b);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 6.5, 18);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 2.5, 0);

scene.add(new THREE.AmbientLight(0xffffff, 0.35));
scene.add(new THREE.HemisphereLight(0xbfe7ff, 0x3b2c1f, 0.6));

const keyLight = new THREE.SpotLight(0xffffff, 2.6, 40, Math.PI * 0.22, 0.35, 1.3);
keyLight.position.set(7, 15, 8);
keyLight.castShadow = true;
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xffd8a8, 0.85);
fillLight.position.set(-6, 8, 5);
scene.add(fillLight);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(15, 96),
  new THREE.MeshStandardMaterial({ color: 0x293444, roughness: 0.95, metalness: 0.04 })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

function pedestal(x, z) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(1.15, 1.35, 0.7, 48),
    new THREE.MeshStandardMaterial({ color: 0x6b7380, roughness: 0.86, metalness: 0.08 })
  );
  mesh.position.set(x, 0.35, z);
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add(mesh);
}

const objects = [];
function addObject(x, z, geometry, material) {
  pedestal(x, z);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, 1.75, z);
  mesh.castShadow = true;
  objects.push(mesh);
  scene.add(mesh);
}

const matcapCanvas = document.createElement("canvas");
matcapCanvas.width = 64;
matcapCanvas.height = 64;
const matcapCtx = matcapCanvas.getContext("2d");
const matcapGradient = matcapCtx.createRadialGradient(32, 20, 4, 32, 32, 30);
matcapGradient.addColorStop(0, "#fff4cc");
matcapGradient.addColorStop(0.2, "#ffd16e");
matcapGradient.addColorStop(0.5, "#c97734");
matcapGradient.addColorStop(1, "#120d10");
matcapCtx.fillStyle = matcapGradient;
matcapCtx.fillRect(0, 0, 64, 64);
const matcapTexture = new THREE.CanvasTexture(matcapCanvas);

const toonData = new Uint8Array([40, 110, 180, 255]);
const toonTexture = new THREE.DataTexture(toonData, 4, 1, THREE.LuminanceFormat);
toonTexture.needsUpdate = true;
toonTexture.minFilter = THREE.NearestFilter;
toonTexture.magFilter = THREE.NearestFilter;

addObject(-7.5, -3.8, new THREE.BoxGeometry(1.5, 1.5, 1.5), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
addObject(-2.5, -3.8, new THREE.SphereGeometry(0.95, 40, 40), new THREE.MeshLambertMaterial({ color: 0xfb923c }));
addObject(2.5, -3.8, new THREE.TorusKnotGeometry(0.68, 0.24, 120, 18), new THREE.MeshPhongMaterial({ color: 0xa78bfa, shininess: 110, specular: 0xffffff }));
addObject(7.5, -3.8, new THREE.CylinderGeometry(0.72, 0.72, 1.8, 48), new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.32, metalness: 0.58 }));
addObject(-7.5, 2.8, new THREE.SphereGeometry(0.92, 48, 48), new THREE.MeshPhysicalMaterial({ color: 0x9bd8ff, roughness: 0.04, transmission: 0.94, transparent: true, thickness: 1.15, clearcoat: 1 }));
addObject(-2.5, 2.8, new THREE.ConeGeometry(0.9, 1.9, 48), new THREE.MeshToonMaterial({ color: 0xf97316, gradientMap: toonTexture }));
addObject(2.5, 2.8, new THREE.TorusKnotGeometry(0.66, 0.24, 180, 28), new THREE.MeshNormalMaterial());
addObject(7.5, 2.8, new THREE.IcosahedronGeometry(1, 1), new THREE.MeshMatcapMaterial({ matcap: matcapTexture, color: 0xfff2ce }));

function animate() {
  objects.forEach((mesh, index) => {
    mesh.rotation.y += 0.005 + index * 0.0002;
  });

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
