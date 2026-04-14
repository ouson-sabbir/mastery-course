window.lessonConfig = {
  slug: "line-dashed",
  title: "LineDashedMaterial",
  summary: "Dashed lines work like line basic material, but now dash and gap values control the pattern.",
  bestFor: "guide paths, design overlays, technical illustrations",
  keyProperties: ["color", "dashSize", "gapSize", "scale", "opacity"],
  createScene({ THREE, scene }) {
    const points = [
      new THREE.Vector3(-3, 1, 0),
      new THREE.Vector3(-1, 2.4, -1),
      new THREE.Vector3(1, 0.8, 1),
      new THREE.Vector3(3, 2.1, 0),
    ];
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineDashedMaterial({ color: 0xfde68a, dashSize: 0.4, gapSize: 0.2 })
    );
    line.computeLineDistances();
    scene.add(line);
    return { update: (time) => { line.rotation.y = time * 0.5; } };
  },
};
