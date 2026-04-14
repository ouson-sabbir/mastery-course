window.lessonConfig = {
  slug: "sprite-material",
  title: "SpriteMaterial",
  summary: "Sprites always face the camera, so they work well for labels, icons, and billboard effects.",
  bestFor: "markers, labels, floating UI, simple billboards",
  keyProperties: ["map", "color", "rotation", "transparent", "opacity"],
  createScene({ THREE, scene }) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.95 }));
    sprite.scale.set(2.2, 2.2, 1);
    sprite.position.set(0, 2, 0);
    scene.add(sprite);
    return { update: (time) => { sprite.position.y = 2 + Math.sin(time * 2) * 0.25; } };
  },
};
