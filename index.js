// canvas
function ParticleFactory(
  canvasOuterEl,
  canvasEl,
  makeupParticle,
  numbOfParticles,
  radius,
  particleConnectRange,
) {
  // properties
  this.numbOfParticles = numbOfParticles || 150;
  this.radius = radius || 1;
  this.particles = [];
  this.canvasOuter = canvasOuterEl;
  this.bCanvas = canvasEl;
  this.w = null;
  this.h = null;
  this.c = null;
  this.frame = null;
  this.range = particleConnectRange || 180;
  this.websTable = {};

  // methods
  this.resizeCavas = function() {
    var _this = this;
    window.addEventListener("resize", _this.updateSizeCanvas.bind(_this));
  };
  this.updateSizeCanvas = function() {
    this.bCanvas.width = this.canvasOuter.clientWidth;
    this.w = this.canvasOuter.clientWidth;

    this.bCanvas.height = this.canvasOuter.clientHeight;
    this.h = this.canvasOuter.clientHeight;
  };

  this.clearWeb = function() {
    this.websTable = {};
  };
  this.animate = function() {
    var _this2 = this;
    _this2.clearWeb();
    _this2.c.clearRect(0, 0, _this2.w, _this2.h);
    var particles = _this2.particles;
    particles.forEach(function(particle) {
      particle.move(_this2.w, _this2.h, _this2.c);
    });
    // update the range of all particles

    // draw the line whether within range
    for (var i = 0; i < _this2.numbOfParticles - 1; i++) {
      var currentParticle = particles[i];
      for (var j = i + 1; j < _this2.numbOfParticles; j++) {
        if (_this2.websTable[hashWebId(i, j)] !== undefined) continue;

        var compareParticle = particles[j];
        if (calcDistance(currentParticle, compareParticle) > _this2.range) {
          _this2.websTable[hash] = false;
          continue;
        }
        var hash = makeWeb(
          i,
          currentParticle,
          j,
          compareParticle,
          _this2.c,
          makeupParticle && makeupParticle["webColor"]
        );
        _this2.websTable[hash] = true;
      }
    }

    var animateFunc = this.animate.bind(this);
    this.frame = requestAnimationFrame(animateFunc);
  };
  this.setup = function() {
    this.resizeCavas();
    this.updateSizeCanvas();
    // init
    this.c = this.bCanvas.getContext("2d");
    var numb = this.numbOfParticles;

    // create particles
    for (var index = 0; index < numb; index++) {
      var x = safeRandomPosition(this.w, this.radius);
      var y = safeRandomPosition(this.h, this.radius);
      var p = new Particle(
        x,
        y,
        this.radius,
        makeupParticle && makeupParticle["particleColor"]
      );
      this.particles.push(p);
    }
    // run
    this.animate();
  };
}

function Particle(x, y, radius, particleColor) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = particleColor || "fff";

  // velocity
  this.dx = (Math.random() - 0.5) * 10;
  this.dy = (Math.random() - 0.5) * 10;

  this.updatePosition = function(w, h) {
    // hit the walls
    if ((this.x + this.radius > w && this.dx > 0) || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    // hit the ceil or bottom
    if ((this.y + this.radius > h && this.dy > 0) || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  };

  this.render = function(c) {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.strokeStyle = this.color;
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
    hash = id1 + "+" + id2;
  } else {
    hash = id2 + "+" + id1;
  }
  return hash;
}
function makeWeb(id1, c1, id2, c2, c, webColor) {
  var x1 = c1.x,
    y1 = c1.y,
    x2 = c2.x,
    y2 = c2.y;

  // render
  c.beginPath();
  c.lineWidth = "0.2";
  c.strokeStyle = webColor || "#fff";
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
