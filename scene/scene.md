# Scene: আমি যা বুঝেছি

`Scene` হচ্ছে আমার 3D দুনিয়ার মূল container। স্ক্রিনে যা দেখি, তার প্রায় সবকিছুই শেষে scene-এর ভিতরে গিয়ে বসে। camera আর renderer আলাদা জিনিস, কিন্তু render করার সময় renderer scene আর camera-কে একসাথে ব্যবহার করে।

## Scene সম্পর্কে আমার সহজ বোঝা

- `scene` নিজে কোনো shape না, এটা একটা root structure।
- আমি mesh, light, helper, group সব scene-এর ভিতরে `add()` করি।
- scene-এর ভিতরে আবার child object থাকতে পারে। তাই scene-কে tree-এর root ভাবলে বুঝতে সুবিধা হয়।
- Scene `Object3D` থেকে এসেছে, তাই `position`, `rotation`, `scale`, `name`, `visible`, `children` এসব ধারণা এখানেও কাজ করে।

## দরকারি property যেগুলো আমার কাজে লাগে

- `background`: scene-এর পেছনের color বা texture সেট করতে কাজে লাগে।
- `fog`: দূরের জিনিসকে হালকা fade করে depth feel দেয়।
- `environment`: reflective material থাকলে environment map থেকে সুন্দর light feel আসে।
- `overrideMaterial`: debug করার সময় scene-এর সব mesh-এ এক material force করে দিতে পারি।
- `children`: scene-এর direct child object গুলো এখানে থাকে।
- `userData`: নিজের মতো extra data রাখার জন্য কাজে লাগে।

## দরকারি method যেগুলো বারবার লাগবে

- `add(object)`: নতুন object scene-এ ঢোকাই।
- `remove(object)`: object scene থেকে বের করি।
- `traverse(callback)`: scene-এর সব child ঘুরে ঘুরে কাজ করি।
- `getObjectByName(name)`: নাম দিয়ে object খুঁজে পাওয়া যায়।
- `clear()`: scene-এর child সরিয়ে ফেলার কাজে লাগতে পারে।

## এই practice code-এ আমি কী দেখিয়েছি

- `scene.background` দিয়ে dark background দিয়েছি।
- `scene.fog` দিয়ে depth feel দেখিয়েছি।
- একাধিক cube-কে `Group`-এর ভিতরে রেখে দেখিয়েছি scene-এর child আবার group-এর child হতে পারে।
- `scene.traverse()` ব্যবহার করে সব spinning cube এক জায়গা থেকে animate করেছি।
- `scene.remove()` দেখানোর জন্য temporary sphere add করে remove করেছি।
- `AxesHelper` দিয়ে local axis বুঝতে সহজ করেছি।

## আমার কাছে সবচেয়ে important learning

Scene-এর বড় কাজ drawing না, organizing। আমি যদি hierarchy না বুঝি, তাহলে scene-এ object আছে মানে শুধু object আছে। কিন্তু hierarchy বুঝলে দেখি parent, child, group, traverse - সব একসাথে scene management-এর part।

আরেকটা জিনিস বুঝেছি, scene clean রাখা খুব important। যা দরকার শুধু তাই scene-এ রাখলে debugging সহজ হয়।

## Common confusion যেটা আমার হয়েছিল

- scene, camera, renderer এক জিনিস না।
- object create করলেই দেখা যাবে না, scene-এ add করতে হবে।
- scene-এ add করলেও camera যদি না দেখে, তাহলে screen-এ কিছুই আসবে না।
- fog বা background scene-এর feel বদলায়, কিন্তু geometry বদলায় না।

## Short summary

আমি scene-কে এখন 3D project-এর root manager হিসেবে দেখি। এখানে সব object ঢুকে, organize হয়, এবং renderer camera-এর সাহায্যে scene-কে screen-এ দেখায়।
