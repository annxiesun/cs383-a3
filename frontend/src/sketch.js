// import PREDICTIONS from "./predictions.json";

export const OPTIONS = {
  agentNum: 20,
  phase: 0,
};

// Exporting a p.called 'mySketch'
export const mySketch = (p) => {
  let i = 0
  let ii = 1

  let image = null;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.lights();

    p.camera(0, 0, -800,
           0, 0, 0,
          0, 20, 0);
      image = p.loadImage('test.PNG'); 
    p.noStroke()
  }

  p.draw = () => {
    p.background(0)

    p.translate(0-ii,0,0)

    p.push()
    p.stroke('#ebb434');
    p.strokeWeight(2);
    p.line(0, -200, 0, -1000);
    p.pop()

    p.push()
    p.rotateY(20+i)
    p.texture(image);
    p.plane(500, 500);
    p.pop()

    ii += 0
    i += 0.01
  }
  p.mousePressed = () => {
    // p.setTint([255, 0, 0]);
  };

  p.getCorrespondingFrame = (x) => {
  };

  p.windowResized = () => {
  };
};
