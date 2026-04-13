const canvas = document.querySelector(".webgl");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x08111b);
scene.fog = new THREE.Fog(0x08111b, 16, 34);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 6.5, 18);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 2.5, 0);

scene.add(new THREE.AmbientLight(0xffffff, 0.35));
scene.add(new THREE.HemisphereLight(0xbfe7ff, 0x3b2c1f, 0.6));

const keyLight = new THREE.SpotLight(0xffffff, 2.6, 40, Math.PI * 0.22, 0.35, 1.3);
keyLight.position.set(7, 15, 8);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
scene.add(keyLight);

const rimLight = new THREE.PointLight(0x72c8ff, 1.2, 25);
rimLight.position.set(-9, 7, -6);
scene.add(rimLight);

const fillLight = new THREE.DirectionalLight(0xffd8a8, 0.85);
fillLight.position.set(-6, 8, 5);
scene.add(fillLight);

const showroom = new THREE.Group();
scene.add(showroom);

function createGradientTexture(stops) {
  const canvasTexture = document.createElement("canvas");
  canvasTexture.width = 64;
  canvasTexture.height = 64;
  const context = canvasTexture.getContext("2d");
  const gradient = context.createRadialGradient(32, 20, 4, 32, 32, 30);

  stops.forEach((stop) => {
    gradient.addColorStop(stop.offset, stop.color);
  });

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvasTexture.width, canvasTexture.height);

  const texture = new THREE.CanvasTexture(canvasTexture);
  texture.encoding = THREE.sRGBEncoding;
  return texture;
}

function createToonGradient() {
  const data = new Uint8Array([40, 110, 180, 255]);
  const texture = new THREE.DataTexture(data, 4, 1, THREE.LuminanceFormat);
  texture.needsUpdate = true;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  return texture;
}

function createLabelSprite(text) {
  const labelCanvas = document.createElement("canvas");
  labelCanvas.width = 256;
  labelCanvas.height = 96;
  const context = labelCanvas.getContext("2d");

  context.fillStyle = "rgba(8, 17, 27, 0.82)";
  context.fillRect(0, 0, labelCanvas.width, labelCanvas.height);
  context.strokeStyle = "rgba(173, 220, 255, 0.8)";
  context.lineWidth = 4;
  context.strokeRect(4, 4, labelCanvas.width - 8, labelCanvas.height - 8);
  context.fillStyle = "#ffffff";
  context.font = "600 28px Segoe UI";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, labelCanvas.width / 2, labelCanvas.height / 2);

  const texture = new THREE.CanvasTexture(labelCanvas);
  texture.encoding = THREE.sRGBEncoding;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });

  const sprite = new THREE.Sprite(material);
  sprite.scale.set(2.8, 1.05, 1);
  return sprite;
}

function createPedestal(x, z) {
  const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(1.15, 1.35, 0.7, 48),
    new THREE.MeshStandardMaterial({
      color: 0x6b7380,
      roughness: 0.86,
      metalness: 0.08,
    })
  );
  pedestal.position.set(x, 0.35, z);
  pedestal.receiveShadow = true;
  pedestal.castShadow = true;
  showroom.add(pedestal);
}

function addShowcase({ name, material, geometry, x, z, y = 1.7, rotationY = 0.45 }) {
  createPedestal(x, z);

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.rotation.y = rotationY;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData.spin = 0.003 + Math.random() * 0.002;
  showroom.add(mesh);

  const label = createLabelSprite(name);
  label.position.set(x, y + 1.6, z);
  showroom.add(label);

  return mesh;
}

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(15, 96),
  new THREE.ShadowMaterial({
    color: 0x000000,
    opacity: 0.35,
  })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const floorBase = new THREE.Mesh(
  new THREE.CircleGeometry(15.4, 96),
  new THREE.MeshStandardMaterial({
    color: 0x293444,
    roughness: 0.95,
    metalness: 0.04,
  })
);
floorBase.rotation.x = -Math.PI / 2;
floorBase.position.y = -0.02;
floorBase.receiveShadow = true;
scene.add(floorBase);

const backWall = new THREE.Mesh(
  new THREE.CylinderGeometry(13.4, 13.4, 10.5, 96, 1, true, Math.PI * 0.18, Math.PI * 0.64),
  new THREE.MeshStandardMaterial({
    color: 0x111b27,
    side: THREE.DoubleSide,
    roughness: 0.98,
    metalness: 0.02,
  })
);
backWall.position.y = 5;
scene.add(backWall);

const matcapTexture = createGradientTexture([
  { offset: 0, color: "#fff4cc" },
  { offset: 0.18, color: "#ffd16e" },
  { offset: 0.42, color: "#c97734" },
  { offset: 0.68, color: "#6c2f1d" },
  { offset: 1, color: "#120d10" },
]);

const toonGradient = createToonGradient();
const demoMeshes = [];

demoMeshes.push(
  addShowcase({
    name: "MeshBasic",
    geometry: new THREE.BoxGeometry(1.5, 1.5, 1.5),
    material: new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.95,
    }),
    x: -7.5,
    z: -4.2,
  })
);

demoMeshes.push(
  addShowcase({
    name: "MeshLambert",
    geometry: new THREE.SphereGeometry(0.95, 40, 40),
    material: new THREE.MeshLambertMaterial({
      color: 0xfb923c,
      emissive: 0x251204,
    }),
    x: -2.5,
    z: -4.2,
  })
);

demoMeshes.push(
  addShowcase({
    name: "MeshPhong",
    geometry: new THREE.TorusKnotGeometry(0.68, 0.24, 120, 18),
    material: new THREE.MeshPhongMaterial({
      color: 0xa78bfa,
      shininess: 110,
      specular: 0xffffff,
    }),
    x: 2.5,
    z: -4.2,
  })
);

demoMeshes.push(
  addShowcase({
    name: "MeshStandard",
    geometry: new THREE.CylinderGeometry(0.72, 0.72, 1.8, 48),
    material: new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.32,
      metalness: 0.58,
      envMapIntensity: 1.1,
    }),
    x: 7.5,
    z: -4.2,
  })
);

demoMeshes.push(
  addShowcase({
    name: "MeshPhysical",
    geometry: new THREE.SphereGeometry(0.92, 48, 48),
    material: new THREE.MeshPhysicalMaterial({
      color: 0x9bd8ff,
      roughness: 0.04,
      metalness: 0,
      transmission: 0.94,
      transparent: true,
      opacity: 1,
      thickness: 1.15,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      ior: 1.45,
      reflectivity: 0.65,
    }),
    x: -7.5,
    z: 2.8,
  })
);

demoMeshes.push(
  addShowcase({
    name: "MeshToon",
    geometry: new THREE.ConeGeometry(0.9, 1.9, 48),
    material: new THREE.MeshToonMaterial({
      color: 0xf97316,
      gradientMap: toonGradient,
    }),
    x: -2.5,
    z: 2.8,
  })
);

demoMeshes.push(
  addShowcase({
    name: "MeshNormal",
    geometry: new THREE.TorusKnotGeometry(0.66, 0.24, 180, 28),
    material: new THREE.MeshNormalMaterial(),
    x: 2.5,
    z: 2.8,
  })
);

demoMeshes.push(
  addShowcase({
    name: "MeshMatcap",
    geometry: new THREE.IcosahedronGeometry(1, 1),
    material: new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
      color: 0xfff2ce,
    }),
    x: 7.5,
    z: 2.8,
  })
);

demoMeshes.push(
  addShowcase({
    name: "MeshDepth",
    geometry: new THREE.BoxGeometry(1.25, 2.2, 1.25),
    material: new THREE.MeshDepthMaterial(),
    x: 0,
    z: 8.4,
    y: 2.1,
    rotationY: 0.2,
  })
);

const lineCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-9, 5.8, 7.8),
  new THREE.Vector3(-5.5, 7.4, 2.8),
  new THREE.Vector3(-1.5, 5.4, -0.5),
  new THREE.Vector3(2.8, 6.8, 2.2),
  new THREE.Vector3(7.5, 5.6, 7.4),
]);

const lineBasic = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints(lineCurve.getPoints(120)),
  new THREE.LineBasicMaterial({ color: 0x7dd3fc })
);
scene.add(lineBasic);

const lineDashed = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-8.2, 1.1, 9),
      new THREE.Vector3(-3.4, 2.6, 10.5),
      new THREE.Vector3(2.5, 1.2, 10.2),
      new THREE.Vector3(8.4, 2.5, 8.6),
    ]).getPoints(60)
  ),
  new THREE.LineDashedMaterial({
    color: 0xfde68a,
    dashSize: 0.42,
    gapSize: 0.2,
  })
);
lineDashed.computeLineDistances();
scene.add(lineDashed);

const particleCount = 180;
const positions = new Float32Array(particleCount * 3);

for (let index = 0; index < particleCount; index += 1) {
  const i3 = index * 3;
  positions[i3] = (Math.random() - 0.5) * 22;
  positions[i3 + 1] = Math.random() * 8 + 1.5;
  positions[i3 + 2] = (Math.random() - 0.5) * 22;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const particles = new THREE.Points(
  particlesGeometry,
  new THREE.PointsMaterial({
    color: 0xc4f1ff,
    size: 0.08,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
  })
);
scene.add(particles);

const floatingBadge = new THREE.Sprite(
  new THREE.SpriteMaterial({
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.9,
  })
);
floatingBadge.position.set(0, 8.7, 0);
floatingBadge.scale.set(0.9, 0.9, 0.9);
scene.add(floatingBadge);

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  demoMeshes.forEach((mesh, index) => {
    mesh.rotation.y += mesh.userData.spin;
    mesh.position.y += Math.sin(elapsedTime * 1.3 + index * 0.7) * 0.0025;
  });

  lineBasic.rotation.y = elapsedTime * 0.12;
  lineDashed.rotation.y = -elapsedTime * 0.18;
  particles.rotation.y = elapsedTime * 0.03;
  floatingBadge.position.y = 8.7 + Math.sin(elapsedTime * 2.4) * 0.18;

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
