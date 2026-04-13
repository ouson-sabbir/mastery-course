# থ্রি.জেএস ম্যাটেরিয়াল লেকচার নোট

আজকের ক্লাসে আমরা Three.js এর একটি খুব গুরুত্বপূর্ণ বিষয় শিখব, আর সেটি হলো `material`।
সহজ ভাষায় বললে, geometry আমাদের অবজেক্টের shape দেয়, আর material বলে দেয় সেই shape দেখতে কেমন হবে।
মানে, একই `BoxGeometry` আমরা যদি `MeshBasicMaterial` দিয়ে রেন্ডার করি, আর `MeshStandardMaterial` দিয়ে রেন্ডার করি, তাহলে shape একই থাকবে কিন্তু look পুরো আলাদা হবে।

ক্লাসের শুরুতে আমি এই লাইনটি বলব:

`Geometry is the body, material is the skin and surface behavior.`

বাংলায়:

`জিওমেট্রি অবজেক্টের গঠন, আর ম্যাটেরিয়াল অবজেক্টের দৃশ্যমান চরিত্র।`

## শুরুতে কী বুঝাব

Three.js এ সাধারণত আমরা তিনটি জিনিস একসাথে ব্যবহার করি:

- `Geometry`
- `Material`
- `Mesh`

আমি উদাহরণ দিয়ে বলব:

`Geometry + Material = Mesh`

## Material কেন এত গুরুত্বপূর্ণ

Material শুধু color না। Material ঠিক করে:

- light এ অবজেক্ট কেমন react করবে
- surface matte হবে নাকি glossy হবে
- metal feel দেবে নাকি plastic feel দেবে
- glass এর মতো transparent হবে কিনা
- cartoon style হবে নাকি realistic হবে

## আমি যেভাবে material class গুলো explain করব

### 1. MeshBasicMaterial

এটি সবচেয়ে simple material। এটি light calculate করে না।

মূল property:

- `color`
- `wireframe`
- `transparent`
- `opacity`

### 2. MeshLambertMaterial

এটি light নেয়, কিন্তু shiny highlight দেয় না। Matte surface এর জন্য ভালো।

মূল property:

- `color`
- `emissive`
- `map`

### 3. MeshPhongMaterial

এটি classic shiny material। এতে specular highlight দেখা যায়।

মূল property:

- `color`
- `shininess`
- `specular`
- `emissive`

### 4. MeshStandardMaterial

এটি realistic material এর জন্য সবচেয়ে important।

আমি বলব:

`Modern realistic rendering এ roughness আর metalness দুইটা property খুব important।`

ব্যাখ্যা:

- `roughness = 0` হলে surface smooth
- `roughness = 1` হলে surface rough
- `metalness = 0` হলে non-metal
- `metalness = 1` হলে metal

### 5. MeshPhysicalMaterial

এটি `MeshStandardMaterial`-এর advanced version।
Glass, acrylic, polished product এর জন্য খুব useful।

মূল property:

- `transmission`
- `thickness`
- `clearcoat`
- `clearcoatRoughness`
- `ior`
- `reflectivity`

### 6. MeshToonMaterial

এটি cartoon বা stylized shading এর জন্য।

মূল property:

- `color`
- `gradientMap`

### 7. MeshNormalMaterial

এটি normal direction অনুযায়ী color দেখায়।
Geometry শেখানোর জন্য দারুণ।

### 8. MeshMatcapMaterial

এটি fake baked lighting এর মতো কাজ করে।
Light setup simple রেখে সুন্দর sculpt-like look দেয়।

মূল property:

- `matcap`
- `color`

### 9. MeshDepthMaterial

এটি depth অনুযায়ী color দেখায়।
Depth visualization বা effect explain করার জন্য useful।

### 10. ShadowMaterial

এটি object visible না রেখে শুধু shadow দেখায়।

### 11. LineBasicMaterial এবং LineDashedMaterial

Path, orbit, helper line, guide line এর জন্য।

### 12. PointsMaterial

Particles, star field, dust effect এর জন্য।

মূল property:

- `size`
- `sizeAttenuation`
- `color`
- `opacity`

### 13. SpriteMaterial

Camera-facing label, icon, marker এর জন্য।

### 14. ShaderMaterial এবং RawShaderMaterial

Built-in material দিয়ে কাজ না হলে custom shader লিখে নিজস্ব effect বানানো যায়।

## Property explain করার ready speech

আমি এভাবে বলব:

`একটি material শিখতে গেলে শুধু তার নাম জানলে হবে না। তার কোন property visual result বদলায়, সেটা বুঝতে হবে।`

তারপর explain করব:

- `color` = base color
- `roughness` = surface smooth নাকি rough
- `metalness` = metal feel আছে কিনা
- `transparent` = alpha blending চালু হবে কিনা
- `opacity` = কতটা visible
- `wireframe` = edge-only mode
- `side` = `FrontSide`, `BackSide`, `DoubleSide`
- `emissive` = নিজের glow
- `shininess` = highlight strength
- `specular` = highlight color
- `transmission` = glass-like pass-through
- `thickness` = transparent material-এর depth feel

## Demo explain করার speech

আমি demo scene চালিয়ে বলব:

`এখানে তোমরা একই lighting environment-এ আলাদা আলাদা material দেখছো। material বুঝতে হলে common light setup-এ compare করতে হয়।`

Object ধরে ধরে বলব:

- cyan box = `MeshBasicMaterial`
- orange sphere = `MeshLambertMaterial`
- purple knot = `MeshPhongMaterial`
- green cylinder = `MeshStandardMaterial`
- glass sphere = `MeshPhysicalMaterial`
- orange cone = `MeshToonMaterial`
- rainbow knot = `MeshNormalMaterial`
- gold crystal = `MeshMatcapMaterial`
- gray box = `MeshDepthMaterial`

## Practice file explain করার speech

আমি বলব:

`Practice file-এ আমি ready-made scene রেখেছি। তোমাদের কাজ হবে property change করার আগে output predict করা, তারপর run করে মিলিয়ে দেখা।`

Task:

1. roughness বাড়াও
2. metalness বাড়াও
3. center object কে `MeshPhongMaterial` বানাও
4. transparent object-এ `thickness` বাড়াও
5. ring-এ `DoubleSide` দাও
6. নতুন `MeshToonMaterial` object add করো

## Lecture closing

ক্লাসের শেষে আমি এই summary বলব:

`Three.js এ ভালো render করতে চাইলে শুধু geometry জানলেই হবে না। সঠিক material নির্বাচন করতে হবে। কারণ material-ই ঠিক করে object realistic, stylized, glossy, matte, metal, glass বা cartoon look দেবে।`

আরও ছোট করে:

`Material choice decides the visual truth of your 3D object.`

## Tomorrow class-এর জন্য short closing line

`আজকের lecture থেকে তোমরা মনে রাখবে, geometry shape দেয়, কিন্তু material personality দেয়। তাই Three.js এ material বুঝতে পারা মানে rendering-এর অর্ধেক জয় করা।`
