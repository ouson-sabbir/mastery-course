window.lessonConfig = {
  slug: "mesh-normal",
  title: "MeshNormalMaterial",
  summary: "Normal material paints each face direction with color, so it is great for understanding geometry flow.",
  bestFor: "debugging, topology teaching, technical visuals",
  keyProperties: ["flatShading", "wireframe", "transparent", "opacity"],
  createScene({ THREE, scene }) {
    const mesh = new THREE.Mesh(new THREE.TorusKnotGeometry(0.85, 0.28, 180, 28), new THREE.MeshNormalMaterial());
    mesh.position.y = 1.5;
    scene.add(mesh);
    return { update: () => { mesh.rotation.x += 0.008; mesh.rotation.y += 0.014; } };
  },
};
