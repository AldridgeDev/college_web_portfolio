console.clear();

class Ball {
  type     = 0;
  time     = random(1500, 2000);
  lifespan = Date.now() + this.time;

  constructor(
    public radius       = 1,
    public location     = createVector(width / 2, height / 2),
    public velocity     = createVector(random(-2, 2) * random(-2, 2) * random(-2, 2) / 3, random(-1, 0)),
    public acceleration = createVector(0, 0)
  ) {}

  applyForce(force: p5.Vector) {
    this.acceleration.add(force.copy());
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    const { lifespan, time , location, radius } = this;
    const opacity = map(Date.now(), lifespan - time, lifespan, 0, 1);
    const red = color(`rgba(204, 51, 102, ${ constrain(1 - opacity, 0, 1) })`);

    if (this.type === 1) {
      noStroke();
      fill(red);
    } else {
      noFill();
      stroke(red);
    }

    ellipse(location.x, location.y, radius, radius);
  }

  rebornIfDied() {
    if (Date.now() > this.lifespan || this.location.y < 0) {
      this.time         = random(1000, 1500);
      this.lifespan     = Date.now() + this.time;
      this.location     = createVector(mouseX || width / 2, mouseY || height / 2);
      this.velocity     = createVector(random(-2, 2) * random(-2, 2) * random(-2, 2) / 3, random(-1, 0));
      this.acceleration = createVector(0, 0);
      this.type         = random([0, 1]);
    }
  }
}

let wind = new p5.Vector(0, -0.04);
let balls: Ball[] = [];

function setup() {
  const { innerWidth, innerHeight } = window;

  createCanvas(innerWidth, innerHeight);

  for (let i = 0; i < 300; i += 1) {
    balls.push(new Ball(random(4, 8), p5.Vector(mouseX, mouseY)));
  }
}

function draw() {
  blendMode(BLEND);
  clear();
  background(33);

  blendMode(LIGHTEST);

  balls.forEach(ball => {
    if (mouseIsPressed) {
      let wind1 = wind.copy().mult(4);
    }

    ball.applyForce(mouseIsPressed ? wind1 : wind);
    ball.update();
    ball.display();
    ball.rebornIfDied();
  });
}

function windowResized() {
  const { innerWidth, innerHeight } = window;

  resizeCanvas(innerWidth, innerHeight);
}
