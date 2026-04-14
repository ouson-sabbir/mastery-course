window.lessonConfig = {
  slug: "mesh-toon",
  title: "MeshToonMaterial",
  summary: "Toon creates hard light bands and a cartoon-like surface response.",
  bestFor: "stylized characters, anime-like art, playful scenes",
  keyProperties: ["color", "gradientMap", "map", "normalMap", "wireframe"],
  createScene({ THREE, scene }) {
    const data = new Uint8Array([40, 110, 180, 255]);
    const gradientMap = new THREE.DataTexture(data, 4, 1, THREE.LuminanceFormat);
    gradientMap.needsUpdate = true;
    gradientMap.minFilter = THREE.NearestFilter;
    gradientMap.magFilter = THREE.NearestFilter;
    const mesh = new THREE.Mesh(
      new THREE.ConeGeometry(1, 2.2, 48),
      new THREE.MeshToonMaterial({ color: 0xf97316, gradientMap })
    );
    mesh.position.y = 1.3;
    scene.add(mesh);
    return { update: () => { mesh.rotation.y += 0.014; } };
  },
};
