window.lessonConfig = {
  slug: "mesh-phong",
  title: "MeshPhongMaterial",
  summary: "Phong is an older shiny material model with visible specular highlights.",
  bestFor: "classic shiny surfaces, highlight demos, old tutorial comparison",
  keyProperties: ["color", "shininess", "specular", "emissive", "flatShading"],
  createScene({ THREE, scene }) {
    const mesh = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.85, 0.28, 140, 24),
      new THREE.MeshPhongMaterial({ color: 0xa78bfa, shininess: 120, specular: 0xffffff })
    );
    mesh.position.y = 1.6;
    mesh.castShadow = true;
    scene.add(mesh);
    return { update: () => { mesh.rotation.x += 0.01; mesh.rotation.y += 0.015; } };
  },
};
