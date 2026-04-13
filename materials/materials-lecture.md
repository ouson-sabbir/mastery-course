# Three.js Materials Masterclass

## 1. What Is a Material?

In Three.js, a **material** defines how a surface looks when the geometry is rendered.

Think of it like this:

- `Geometry` = shape
- `Material` = surface behavior
- `Mesh` = shape + surface together

Example:

```js
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x22c55e });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

## 2. Big Material Groups

### Light-independent

- `MeshBasicMaterial`
- `MeshMatcapMaterial`
- `MeshNormalMaterial`

### Light-reactive classic materials

- `MeshLambertMaterial`
- `MeshPhongMaterial`

### Physically based rendering materials

- `MeshStandardMaterial`
- `MeshPhysicalMaterial`

### Stylized and utility materials

- `MeshToonMaterial`
- `MeshDepthMaterial`
- `MeshDistanceMaterial`
- `ShadowMaterial`

### Non-mesh materials

- `LineBasicMaterial`
- `LineDashedMaterial`
- `PointsMaterial`
- `SpriteMaterial`
- `ShaderMaterial`
- `RawShaderMaterial`

## 3. Shared Properties

| Property | Meaning | Common Values |
| --- | --- | --- |
| `color` | Main visible color | hex like `0xff0000` |
| `transparent` | Enables alpha blending | `true`, `false` |
| `opacity` | Transparency amount | `0` to `1` |
| `wireframe` | Draw faces as edges only | `true`, `false` |
| `side` | Which face to render | `THREE.FrontSide`, `THREE.BackSide`, `THREE.DoubleSide` |
| `visible` | Show or hide material | `true`, `false` |
| `blending` | How pixels mix | `THREE.NormalBlending`, `THREE.AdditiveBlending`, `THREE.MultiplyBlending` |
| `depthTest` | Respect depth buffer | `true`, `false` |
| `depthWrite` | Write to depth buffer | `true`, `false` |
| `fog` | Respond to scene fog | `true`, `false` |
| `flatShading` | Hard polygon look | `true`, `false` |

## 4. Material-by-Material Guide

### MeshBasicMaterial

- Purpose: simple surface with no lighting response
- Best for: helpers, UI elements, wireframe, debugging
- Key properties: `color`, `map`, `wireframe`, `transparent`, `opacity`

```js
const material = new THREE.MeshBasicMaterial({
  color: 0x38bdf8,
  transparent: true,
  opacity: 0.9,
});
```

### MeshLambertMaterial

- Purpose: diffuse matte lighting
- Best for: simple non-shiny objects
- Key properties: `color`, `emissive`, `map`, `lightMap`

```js
const material = new THREE.MeshLambertMaterial({
  color: 0xfb923c,
  emissive: 0x251204,
});
```

### MeshPhongMaterial

- Purpose: classic shiny highlight model
- Best for: polished plastic, old-school demos
- Key properties: `color`, `shininess`, `specular`, `emissive`

```js
const material = new THREE.MeshPhongMaterial({
  color: 0xa78bfa,
  shininess: 110,
  specular: 0xffffff,
});
```

### MeshStandardMaterial

- Purpose: physically based realistic shading
- Best for: most real-world assets
- Key properties: `color`, `roughness`, `metalness`, `roughnessMap`, `metalnessMap`, `normalMap`, `aoMap`, `envMapIntensity`

```js
const material = new THREE.MeshStandardMaterial({
  color: 0x22c55e,
  roughness: 0.32,
  metalness: 0.58,
  envMapIntensity: 1.1,
});
```

### MeshPhysicalMaterial

- Purpose: advanced PBR material
- Best for: glass, acrylic, premium products
- Key properties: `transmission`, `thickness`, `clearcoat`, `clearcoatRoughness`, `ior`, `reflectivity`, `roughness`, `metalness`

```js
const material = new THREE.MeshPhysicalMaterial({
  color: 0x9bd8ff,
  roughness: 0.04,
  transmission: 0.94,
  transparent: true,
  thickness: 1.15,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  ior: 1.45,
  reflectivity: 0.65,
});
```

### MeshToonMaterial

- Purpose: hard cartoon shading bands
- Best for: stylized rendering
- Key properties: `color`, `gradientMap`, `map`, `normalMap`

```js
const material = new THREE.MeshToonMaterial({
  color: 0xf97316,
  gradientMap: toonGradient,
});
```

### MeshNormalMaterial

- Purpose: color by normal direction
- Best for: debugging and technical visuals
- Key properties: `flatShading`, `wireframe`

```js
const material = new THREE.MeshNormalMaterial();
```

### MeshMatcapMaterial

- Purpose: fake lighting from a baked matcap
- Best for: sculpt previews and fast stylized shading
- Key properties: `matcap`, `color`, `bumpMap`, `normalMap`

```js
const material = new THREE.MeshMatcapMaterial({
  matcap: matcapTexture,
  color: 0xfff2ce,
});
```

### MeshDepthMaterial

- Purpose: depth visualization
- Best for: depth effects and debugging
- Key properties: `wireframe`, `depthPacking`

```js
const material = new THREE.MeshDepthMaterial();
```

### MeshDistanceMaterial

- Purpose: distance-based rendering for advanced workflows
- Best for: shadow and custom distance effects
- Key properties: `nearDistance`, `farDistance`, `referencePosition`

```js
const material = new THREE.MeshDistanceMaterial({
  nearDistance: 1,
  farDistance: 30,
});
```

### ShadowMaterial

- Purpose: show only shadows
- Best for: invisible floor receivers
- Key properties: `color`, `opacity`

```js
const material = new THREE.ShadowMaterial({
  color: 0x000000,
  opacity: 0.35,
});
```

### LineBasicMaterial

- Purpose: solid line rendering
- Key properties: `color`, `linewidth`, `transparent`, `opacity`

```js
const material = new THREE.LineBasicMaterial({ color: 0x7dd3fc });
```

### LineDashedMaterial

- Purpose: dashed line rendering
- Key properties: `color`, `dashSize`, `gapSize`, `scale`

```js
const material = new THREE.LineDashedMaterial({
  color: 0xfde68a,
  dashSize: 0.42,
  gapSize: 0.2,
});
```

### PointsMaterial

- Purpose: particles and point clouds
- Key properties: `color`, `size`, `sizeAttenuation`, `map`, `transparent`, `opacity`

```js
const material = new THREE.PointsMaterial({
  color: 0xc4f1ff,
  size: 0.08,
  sizeAttenuation: true,
});
```

### SpriteMaterial

- Purpose: camera-facing billboard
- Best for: labels, icons, markers
- Key properties: `map`, `color`, `rotation`, `transparent`, `opacity`

```js
const material = new THREE.SpriteMaterial({
  color: 0x93c5fd,
  transparent: true,
  opacity: 0.9,
});
```

### ShaderMaterial

- Purpose: custom GLSL shader with Three.js support
- Best for: special effects
- Key properties: `uniforms`, `vertexShader`, `fragmentShader`, `transparent`, `defines`

```js
const material = new THREE.ShaderMaterial({
  uniforms: { uTime: { value: 0 } },
  vertexShader: `
    uniform float uTime;
    void main() {
      vec3 transformed = position;
      transformed.y += sin(position.x * 4.0 + uTime) * 0.15;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
  `,
  fragmentShader: `
    void main() {
      gl_FragColor = vec4(0.2, 0.7, 1.0, 1.0);
    }
  `,
});
```

### RawShaderMaterial

- Purpose: full raw GLSL control
- Best for: advanced shader authoring
- Key properties: `uniforms`, `vertexShader`, `fragmentShader`

```js
const material = new THREE.RawShaderMaterial({
  uniforms: {
    uColor: { value: new THREE.Color(0xff8844) },
  },
  vertexShader: `
    precision mediump float;
    precision mediump int;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    attribute vec3 position;
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    precision mediump float;
    uniform vec3 uColor;
    void main() {
      gl_FragColor = vec4(uColor, 1.0);
    }
  `,
});
```

## 5. Best Material Choice Table

| Situation | Best Material |
| --- | --- |
| No light needed | `MeshBasicMaterial` |
| Simple matte light | `MeshLambertMaterial` |
| Easy shiny highlight | `MeshPhongMaterial` |
| Realistic object | `MeshStandardMaterial` |
| Glass or premium surface | `MeshPhysicalMaterial` |
| Cartoon look | `MeshToonMaterial` |
| Technical/debug look | `MeshNormalMaterial` |
| Fast fake sculpt shading | `MeshMatcapMaterial` |
| Depth view | `MeshDepthMaterial` |
| Shadow-only floor | `ShadowMaterial` |
| Particles | `PointsMaterial` |
| Label or billboard | `SpriteMaterial` |
| Custom GPU effect | `ShaderMaterial` / `RawShaderMaterial` |

## 6. Realistic Demo Breakdown

The file `materials/script.js` is a mini showroom that compares many materials under one lighting setup.

Objects in the scene:

- cyan box: `MeshBasicMaterial`
- orange sphere: `MeshLambertMaterial`
- purple torus knot: `MeshPhongMaterial`
- green cylinder: `MeshStandardMaterial`
- glass sphere: `MeshPhysicalMaterial`
- orange cone: `MeshToonMaterial`
- rainbow torus knot: `MeshNormalMaterial`
- gold crystal: `MeshMatcapMaterial`
- gray box: `MeshDepthMaterial`

Supporting materials:

- floor shadow: `ShadowMaterial`
- floating particles: `PointsMaterial`
- curved display line: `LineBasicMaterial`
- dashed guide line: `LineDashedMaterial`
- labels and badge: `SpriteMaterial`

## 7. Practice Flow

Use `materials/practice.html` and `materials/practice.js`.

Suggested tasks:

1. Change roughness and metalness values and predict the result.
2. Replace one material with another and compare the lighting.
3. Make one object transparent and discuss `transparent`, `opacity`, and `depthWrite`.
4. Compare `FrontSide` and `DoubleSide`.
5. Add a toon or normal material object.

## 8. One-line Lecture Summary

> Geometry gives the object its shape, but material gives it its visual identity.
