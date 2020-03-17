# MINI-PARTICLE

**Mini particle** is the simple library for add particle background in using plain javascript

## Installation
You can use :

  * `npm install mini-particle`
  * `yarn add mini-particle`

## Setup
Add `index.js` into `script`:
```html
<script src="./node_modules/mini-particle/index.js"></script>
```

## Document
```js
var particle = new ParticleFactory(wrapperEl, canvasEl, particleOpt, population, radius, range);
particle.setup();
```
* wrapperEl: wrapper element
* canvasEl: canvas element
* particleOpt: is object has some attributes : `particleColor`: string for color of particle (e.g "#fff" or "white"), `webColor`: string for color of line connect between those particle.


## Examples
Html:
```html
<div class="wrapper">
    <canvas id="mini-particle"></canvas>
</div>
```

Script:
```js
    var wrapperEl = document.querySelector(".wrapper");
    var canvasEl = document.querySelector("#mini-particle");
    var particleOpt = {
      particleColor: "#0f0",
      webColor: "#0ff"
    };
    var range = 80,
      population = 200,
      radius = 2;

    var particle = new ParticleFactory(wrapperEl, canvasEl, particleOpt, population, radius, range);
    particle.setup();
```

## Demo
There is the **test.html** file inside this package for demo:

![my demo](https://github.com/LeTranAnhVu/mini-particles/blob/master/imgs/mini-particle-demo.gif)


## License
Mini-particle is MIT