window.lessonConfig = {
  slug: "mesh-basic",
  title: "MeshBasicMaterial",
  summary: "This material ignores scene lights. The object keeps its color even if you remove all lights.",
  bestFor: "helpers, UI shapes, wireframe demos, simple overlays",
  keyProperties: ["color", "map", "wireframe", "transparent", "opacity", "side"],
  createScene({ THREE, scene }) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: false })
    );
    mesh.position.y = 1.3;
    scene.add(mesh);
    return { update: () => { mesh.rotation.x += 0.01; mesh.rotation.y += 0.012; } };
  },
};
