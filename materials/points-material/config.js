window.lessonConfig = {
  slug: "points-material",
  title: "PointsMaterial",
  summary: "PointsMaterial renders particles instead of a solid mesh surface.",
  bestFor: "dust, stars, sparkles, point clouds",
  keyProperties: ["color", "size", "sizeAttenuation", "map", "transparent", "opacity"],
  createScene({ THREE, scene }) {
    const count = 240;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 6;
      positions[i3 + 1] = Math.random() * 3 + 0.5;
      positions[i3 + 2] = (Math.random() - 0.5) * 6;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({ color: 0xc4f1ff, size: 0.09, sizeAttenuation: true, transparent: true, opacity: 0.9 })
    );
    scene.add(points);
    return { update: (time) => { points.rotation.y = time * 0.15; } };
  },
};
