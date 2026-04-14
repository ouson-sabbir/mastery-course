window.lessonConfig = {
  slug: "mesh-physical",
  title: "MeshPhysicalMaterial",
  summary: "Physical extends standard material with transmission, clearcoat, thickness, and IOR for premium realism.",
  bestFor: "glass, acrylic, coated product surfaces, polished premium objects",
  keyProperties: ["roughness", "metalness", "transmission", "thickness", "clearcoat", "clearcoatRoughness", "ior"],
  createScene({ THREE, scene }) {
    const outer = new THREE.Mesh(
      new THREE.SphereGeometry(1.15, 48, 48),
      new THREE.MeshPhysicalMaterial({
        color: 0xbfe6ff,
        roughness: 0.03,
        transmission: 0.95,
        transparent: true,
        thickness: 1.5,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        ior: 1.45,
      })
    );
    outer.position.y = 1.4;
    outer.castShadow = true;
    scene.add(outer);
    return { update: () => { outer.rotation.y += 0.012; } };
  },
};
