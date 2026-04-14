const config = window.lessonConfig;
const canvas = document.querySelector(".webgl");

const scene = new THREE.Scene();
scene.background = new THREE.Color(config.background || 0x08111b);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

const cameraPosition = config.cameraPosition || [0, 2.8, 7.5];
camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1.2, 0);

scene.add(new THREE.AmbientLight(0xffffff, config.ambientIntensity ?? 0.45));

const keyLight = new THREE.DirectionalLight(0xffffff, config.keyIntensity ?? 1.6);
keyLight.position.set(4, 7, 5);
keyLight.castShadow = true;
scene.add(keyLight);

const rimLight = new THREE.PointLight(0x60a5fa, config.rimIntensity ?? 1.1, 30);
rimLight.position.set(-4, 5, -3);
scene.add(rimLight);

const floorMaterial = config.floorMaterial
  ? config.floorMaterial(THREE)
  : new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      roughness: 0.9,
      metalness: 0.08,
    });

const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const helpers = config.createScene({
  THREE,
  scene,
  camera,
  controls,
  renderer,
});

const panel = document.querySelector(".panel");
panel.innerHTML = `
  <div class="eyebrow">Single Material Lesson</div>
  <h1>${config.title}</h1>
  <p>${config.summary}</p>
  <p><strong>Best use:</strong> ${config.bestFor}</p>
  <ul class="props">${config.keyProperties
    .map((property) => `<li><code>${property}</code></li>`)
    .join("")}</ul>
  <div class="toolbar">
    <a href="../index.html">All Materials</a>
    <a href="../notes/${config.slug}.md">Note File</a>
    <a href="../final-showroom/index.html">Final Showroom</a>
  </div>
`;

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  if (helpers && typeof helpers.update === "function") {
    helpers.update(elapsedTime);
  }

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
