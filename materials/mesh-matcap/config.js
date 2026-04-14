window.lessonConfig = {
  slug: "mesh-matcap",
  title: "MeshMatcapMaterial",
  summary: "Matcap uses a baked texture to fake lighting, so it looks nice even without a complex light setup.",
  bestFor: "sculpt previews, quick stylized shading, art direction tests",
  keyProperties: ["matcap", "color", "normalMap", "bumpMap", "flatShading"],
  createScene({ THREE, scene }) {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext("2d");
    const gradient = context.createRadialGradient(32, 20, 4, 32, 32, 30);
    gradient.addColorStop(0, "#fff4cc");
    gradient.addColorStop(0.2, "#ffd16e");
    gradient.addColorStop(0.5, "#c97734");
    gradient.addColorStop(1, "#120d10");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
    const matcap = new THREE.CanvasTexture(canvas);
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 1), new THREE.MeshMatcapMaterial({ matcap, color: 0xfff2ce }));
    mesh.position.y = 1.4;
    scene.add(mesh);
    return { update: () => { mesh.rotation.y += 0.012; } };
  },
};
