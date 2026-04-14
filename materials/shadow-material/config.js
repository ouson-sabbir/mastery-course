window.lessonConfig = {
  slug: "shadow-material",
  title: "ShadowMaterial",
  summary: "This material is mostly invisible and only displays the shadow falling onto it.",
  bestFor: "product stages, invisible ground planes, compositing demos",
  keyProperties: ["color", "opacity", "transparent"],
  floorMaterial(THREE) {
    return new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.4 });
  },
  createScene({ THREE, scene }) {
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 1.8, 1.8),
      new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.4, metalness: 0.2 })
    );
    cube.position.y = 1.4;
    cube.castShadow = true;
    scene.add(cube);
    return { update: () => { cube.rotation.y += 0.01; cube.rotation.x += 0.006; } };
  },
};
