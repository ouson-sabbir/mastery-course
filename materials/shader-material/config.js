window.lessonConfig = {
  slug: "shader-material",
  title: "ShaderMaterial",
  summary: "ShaderMaterial lets you write custom GLSL while still using Three.js built-in helpers.",
  bestFor: "custom effects, animated surfaces, experimental materials",
  keyProperties: ["uniforms", "vertexShader", "fragmentShader", "transparent", "defines"],
  createScene({ THREE, scene }) {
    const uniforms = { uTime: { value: 0 } };
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3.5, 3.5, 64, 64),
      new THREE.ShaderMaterial({
        uniforms,
        side: THREE.DoubleSide,
        vertexShader: `uniform float uTime; varying float vWave; void main(){ vec3 p = position; p.z += sin(p.x * 3.0 + uTime) * 0.35; vWave = p.z; gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0); }`,
        fragmentShader: `varying float vWave; void main(){ gl_FragColor = vec4(0.18 + vWave, 0.55, 1.0, 1.0); }`,
      })
    );
    mesh.rotation.x = -0.9;
    mesh.position.y = 1.6;
    scene.add(mesh);
    return { update: (time) => { uniforms.uTime.value = time * 2; mesh.rotation.z = time * 0.08; } };
  },
};
