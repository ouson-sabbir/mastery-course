window.lessonConfig = {
  slug: "mesh-standard",
  title: "MeshStandardMaterial",
  summary: "This is the most important realistic material for modern scenes. Roughness and metalness control the look.",
  bestFor: "products, props, environment assets, realistic scenes",
  keyProperties: ["color", "roughness", "metalness", "map", "roughnessMap", "metalnessMap", "normalMap"],
  createScene({ THREE, scene }) {
    const left = new THREE.Mesh(new THREE.SphereGeometry(0.9, 48, 48), new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.1, metalness: 0.8 }));
    const right = new THREE.Mesh(new THREE.SphereGeometry(0.9, 48, 48), new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.85, metalness: 0.1 }));
    left.position.set(-1.4, 1.1, 0);
    right.position.set(1.4, 1.1, 0);
    left.castShadow = true;
    right.castShadow = true;
    scene.add(left, right);
    return { update: () => { left.rotation.y += 0.01; right.rotation.y += 0.01; } };
  },
};
