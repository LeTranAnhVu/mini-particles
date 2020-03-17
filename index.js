// canvas
function BannerFactory(
    numbOfParticles,
    radius,
    particleConnectRange,
    canvasOuter,
    canvasId
  ) {
    // properties
    this.numbOfParticles = numbOfParticles || 150;
    this.radius = radius || 1;
    this.particles = [];
    this.canvasOuter = $(canvasOuter);
    this.bCanvas = $(canvasId)[0];
    this.w = null;
    this.h = null;
    this.c = null;
    this.frame = null;
    this.range = particleConnectRange || 180;
    this.websTable = {};
    // methods
    this.resizeCavas = function resizeCavas() {
      var _this = this;
      $(window).resize(function() {
        _this.updateSizeCanvas();
      });
    };
    this.updateSizeCanvas = function updateSizeCanvas() {
      this.w = this.bCanvas.width = this.canvasOuter.width();
      this.h = this.bCanvas.height = window.innerHeight;
    };
  
    this.clearWeb = function() {
      this.websTable = {};
    };
    this.animate = function animate() {
      var _this2 = this;
      _this2.clearWeb();
      _this2.c.clearRect(0, 0, _this2.w, _this2.h);
      var particles = _this2.particles;
      particles.forEach(function(particle) {
        particle.move(_this2.w, _this2.h, _this2.c);
      });
      // update the range of all particles
  
      // draw the line whether within range
      for (let i = 0; i < _this2.numbOfParticles - 1; i++) {
        var currentParticle = particles[i];
        for (let j = i + 1; j < _this2.numbOfParticles; j++) {
          if (_this2.websTable[hashWebId(i, j)] !== undefined) continue;
          var compareParticle = particles[j];
          if (calcDistance(currentParticle, compareParticle) > _this2.range)
            continue;
          var hash = makeWeb(i, currentParticle, j, compareParticle, _this2.c);
          _this2.websTable[hash] = true;
        }
      }
  
      var animateFunc = this.animate.bind(this);
      this.frame = requestAnimationFrame(animateFunc);
    };
    this.setup = function setup() {
      this.resizeCavas();
      this.updateSizeCanvas();
      // init
      this.c = this.bCanvas.getContext("2d");
      var numb = this.numbOfParticles;
  
      // create particles
      for (var index = 0; index < numb; index++) {
        var x = safeRandomPosition(this.w, this.radius);
        var y = safeRandomPosition(this.h, this.radius);
        var p = new Circle(x, y, this.radius);
        this.particles.push(p);
      }
      // run
      this.animate();
    };
  }
  
  function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "";
  
    // velocity
    this.dx = (Math.random() - 0.5) * 10;
    this.dy = (Math.random() - 0.5) * 10;
    this.randomColor = function() {
      var colors = ["#7ed6df", "#f6e58d", "#badc58", "#c7ecee", "#eb2f06"];
      this.color = colors[parseInt(Math.random() * colors.length)];
    };
    this.updatePosition = function(w, h) {
      // hit the walls
      if (this.x + this.radius > w || this.x - this.radius < 0) {
        this.randomColor();
        this.dx = -this.dx;
      }
      // hit the ceil or bottom
      if (this.y + this.radius > h || this.y - this.radius < 0) {
        this.randomColor();
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;
    };
  
    this.render = function(c) {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.strokeStyle = this.color || "white";
      c.stroke();
    };
    this.move = function(w, h, c) {
      this.updatePosition(w, h);
      this.render(c);
    };
  }
  
  function hashWebId(id1, id2) {
    var hash = "";
    if (id1 > id2) {
      hash = `${id1}+${id2}`;
    } else {
      hash = `${id2}+${id1}`;
    }
    return hash;
  }
  function makeWeb(id1, c1, id2, c2, c) {
    var x1 = c1.x,
      y1 = c1.y,
      x2 = c2.x,
      y2 = c2.y;
  
    // render
    c.beginPath();
    c.lineWidth = "0.2";
    c.strokeStyle = "#fff";
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke(); // Draw it
    return hashWebId(id1, id2);
  }
  
  function calcDistance(c1, c2) {
    var x1 = c1.x,
      y1 = c1.y,
      x2 = c2.x,
      y2 = c2.y,
      dx,
      dy,
      distance;
  
    dx = Math.abs(x2 - x1);
    dy = Math.abs(y2 - y1);
  
    distance = Math.sqrt(dx ** 2 + dy ** 2);
    return distance;
  }
  
  function safeRandomPosition(range, padding) {
    var pos = parseInt(Math.random() * range);
    if (pos > range - padding) {
      pos = range - padding;
    } else if (pos < padding) {
      pos = padding;
    }
    return pos;
  }
  