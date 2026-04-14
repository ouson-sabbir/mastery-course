window.lessonConfig = {
  slug: "mesh-depth",
  title: "MeshDepthMaterial",
  summary: "Depth material shows how far surfaces are from the camera, which is useful for understanding depth-based effects.",
  bestFor: "depth visualization, fog logic, custom post-processing lessons",
  keyProperties: ["depthPacking", "wireframe", "map", "alphaMap"],
  createScene({ THREE, scene }) {
    const nearMesh = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.3, 1.3), new THREE.MeshDepthMaterial());
    const farMesh = new THREE.Mesh(new THREE.SphereGeometry(0.9, 40, 40), new THREE.MeshDepthMaterial());
    nearMesh.position.set(-1.6, 1.1, 0);
    farMesh.position.set(1.7, 1.1, -2.3);
    scene.add(nearMesh, farMesh);
    return { update: () => { nearMesh.rotation.y += 0.01; farMesh.rotation.y += 0.01; } };
  },
};
