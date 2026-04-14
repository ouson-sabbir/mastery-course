window.lessonConfig = {
  slug: "mesh-distance",
  title: "MeshDistanceMaterial",
  summary: "Distance material is an advanced material mostly used in depth and shadow workflows.",
  bestFor: "advanced shadow systems and distance-based teaching",
  keyProperties: ["nearDistance", "farDistance", "referencePosition", "alphaMap"],
  createScene({ THREE, scene }) {
    const material = new THREE.MeshDistanceMaterial({ nearDistance: 1, farDistance: 10 });
    const a = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.3, 1.3), material);
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.95, 40, 40), material);
    a.position.set(-1.6, 1.1, 0);
    b.position.set(1.7, 1.1, -2.6);
    scene.add(a, b);
    return { update: () => { a.rotation.y += 0.01; b.rotation.y += 0.01; } };
  },
};
