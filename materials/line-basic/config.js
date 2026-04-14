window.lessonConfig = {
  slug: "line-basic",
  title: "LineBasicMaterial",
  summary: "LineBasicMaterial draws a simple solid line. It is useful when the lesson is about paths instead of surfaces.",
  bestFor: "guides, paths, graph lines, orbit trails",
  keyProperties: ["color", "linewidth", "transparent", "opacity"],
  createScene({ THREE, scene }) {
    const points = [
      new THREE.Vector3(-3, 1, 0),
      new THREE.Vector3(-1, 2.4, -1),
      new THREE.Vector3(1, 0.8, 1),
      new THREE.Vector3(3, 2.1, 0),
    ];
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: 0x7dd3fc })
    );
    scene.add(line);
    return { update: (time) => { line.rotation.y = time * 0.5; } };
  },
};
