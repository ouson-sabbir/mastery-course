window.lessonConfig = {
  slug: "raw-shader-material",
  title: "RawShaderMaterial",
  summary: "RawShaderMaterial is like ShaderMaterial, but you write more of the GLSL plumbing yourself.",
  bestFor: "advanced shader classes and low-level control",
  keyProperties: ["uniforms", "vertexShader", "fragmentShader"],
  createScene({ THREE, scene }) {
    const uniforms = { uColor: { value: new THREE.Color(0xff8844) } };
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.RawShaderMaterial({
        uniforms,
        side: THREE.DoubleSide,
        vertexShader: `precision mediump float; precision mediump int; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; attribute vec3 position; void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `precision mediump float; uniform vec3 uColor; void main(){ gl_FragColor = vec4(uColor,1.0); }`,
      })
    );
    mesh.position.y = 1.6;
    scene.add(mesh);
    return { update: (time) => { mesh.rotation.y = time * 0.4; } };
  },
};
