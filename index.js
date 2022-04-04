const planets = [];
const G = 0.1;

function setup() {
  createCanvas(windowWidth-25, windowHeight-25);
  for(let i = 0; i < 100; i++) {
    const x = randomGaussian(0,300);
    const y = randomGaussian(0,150);
    const xv = randomGaussian(0,2);
    const yv = randomGaussian(0,2);
    const mass = randomGaussian(50,20);
    planets.push(new Planet(x, y, xv, yv, mass));
  }
  for(let i = 0; i < 100; i++) {
    const x = randomGaussian(0,400);
    const y = randomGaussian(0,200);
    const v = createVector(x,y).rotate(90).div(50);
    const mass = randomGaussian(100,75);
    planets.push(new Planet(x, y, v.x, v.y, mass));
  }
  const bh = new Blackhole(0, 0, 0, 0, 300);
  planets.push(bh);
}

function draw() {
  background(20,64);
  translate(width / 2, height / 2);

  for(const planet of planets) {
    for(const splanet of planets) {
      if (planet !== splanet) {
        planet.attract(splanet);
      }
    }
    planet.update();
    planet.show();
  }
  noFill();
}

class Planet {
  constructor(x, y, xv, yv, mass) {
    this.pos = createVector(x,y);
    this.vel = createVector(xv,yv);
    this.acc = createVector(0,0);
    this.mass = mass;
    this.r = sqrt(mass) * 2;
    this.angle = 0;
  }

  show() {
    fill('red');
    ellipse(this.pos.x,this.pos.y,this.r,this.r);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0,0);
  }

  applyForce(force) {
    const f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  attract(other) {
    let force = p5.Vector.sub(this.pos, other.pos);
    let distanceSq = constrain(force.magSq(), 100, 1000);
    let strength = (G * (this.mass * other.mass)) / distanceSq;
    force.setMag(strength);
    other.applyForce(force);
  }
}

class Blackhole extends Planet {
  show() {
    //fill('black');
    //ellipse(this.pos.x,this.pos.y,this.r,this.r);
  }
  update(){
    //this.pos.x += this.r * cos(this.angle) / 50;
    //this.pos.y += this.r * sin(this.angle) / 50;
    //this.angle += 0.005;

  }
  applyForce(){}
}
