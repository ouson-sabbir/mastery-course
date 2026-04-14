window.lessonConfig = {
  slug: "mesh-lambert",
  title: "MeshLambertMaterial",
  summary: "Lambert reacts to light but stays matte. It does not create sharp shiny highlights.",
  bestFor: "matte objects, simple lighting lessons, performance-friendly scenes",
  keyProperties: ["color", "emissive", "map", "lightMap", "wireframe"],
  createScene({ THREE, scene }) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.25, 48, 48),
      new THREE.MeshLambertMaterial({ color: 0xfb923c, emissive: 0x1f1104 })
    );
    mesh.position.y = 1.4;
    mesh.castShadow = true;
    scene.add(mesh);
    return { update: () => { mesh.rotation.y += 0.012; } };
  },
};
