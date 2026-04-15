# Geometry: আমি যা বুঝেছি

Geometry হলো object-এর shape data। mesh-কে আমি যতই সুন্দর material দিই, geometry না থাকলে object-এর body-ই থাকবে না। সহজ ভাষায় বললে, geometry shape বানায় আর material সেই shape-এর গায়ে look দেয়।

## Geometry নিয়ে আমার পরিষ্কার ধারণা

- `BoxGeometry`, `SphereGeometry`, `ConeGeometry`, `PlaneGeometry` এগুলো ready-made geometry।
- Three.js-এ ভিতরের আসল data structure হচ্ছে `BufferGeometry`।
- Geometry-এর ভিতরে vertex data, normal, uv, index এগুলো থাকে।
- Mesh তৈরি করতে হলে `geometry + material` একসাথে লাগে।

## Important property আর idea

- `attributes.position`: vertex কোথায় আছে সেটা ধরে।
- `attributes.normal`: light কিভাবে পড়বে সেটা বোঝাতে সাহায্য করে।
- `attributes.uv`: texture map বসানোর সময় লাগে।
- `index`: কোন vertex গুলো মিলে triangle হবে সেটা বোঝায়।
- `boundingBox` আর `boundingSphere`: size বা collision type কাজের সময় useful।

## Useful method যেগুলো বুঝে রাখা দরকার

- `translate()`: geometry data-কে সরায়।
- `rotateX()`, `rotateY()`, `rotateZ()`: geometry-কে ঘোরায়।
- `scale()`: geometry level-এ size change করে।
- `center()`: geometry-কে center-এ আনতে কাজে লাগে।
- `computeVertexNormals()`: vertex edit করার পরে light ঠিক করতে দরকার হয়।
- `dispose()`: geometry দরকার না হলে memory clean করার জন্য important।

## এই practice code-এ আমি কী করেছি

- একসাথে কয়েকটা built-in geometry দেখিয়েছি যাতে shape পার্থক্য চোখে পড়ে।
- `BoxGeometry`, `SphereGeometry`, `ConeGeometry`, `TorusKnotGeometry` পাশাপাশি বসিয়েছি।
- সবার rotation আলাদা speed-এ চলছে, যাতে geometry shape বোঝা সহজ হয়।
- `PlaneGeometry`-এর vertex edit করে wave বানিয়েছি। এতে বুঝেছি geometry শুধু ready-made shape না, data edit করেও shape change করা যায়।
- `computeVertexNormals()` কল করে দেখিয়েছি vertex বদলানোর পরে lighting data update করা দরকার।

## আমার কাছে সবচেয়ে দরকারি learning

আগে ভাবতাম geometry মানে শুধু box, sphere, plane বেছে নেওয়া। এখন বুঝেছি geometry আসলে shape-এর raw structure। built-in geometry শুধু shortcut। ভিতরে সবকিছু vertex আর triangle level-এ গিয়ে দাঁড়ায়।

আরেকটা জিনিস clear হয়েছে: mesh rotate করা আর geometry edit করা এক জিনিস না। mesh rotate করলে object ঘোরে, কিন্তু geometry edit করলে object-এর body-টাই বদলে যায়।

## Common mistake যেগুলো সহজে হয়

- geometry আর material-এর কাজ গুলিয়ে ফেলা।
- segment কম দিলে shape blocky দেখা যায়।
- vertex edit করার পরে `needsUpdate` না দেওয়া।
- custom change করার পরে normal recompute না করা।
- unused geometry dispose না করে memory জমিয়ে রাখা।

## Short summary

আমি geometry-কে এখন shape data হিসেবে দেখি। ready-made geometry দিয়ে শুরু করা সহজ, কিন্তু আসল মজা শুরু হয় যখন vertex level-এ shape edit করা শিখি।







