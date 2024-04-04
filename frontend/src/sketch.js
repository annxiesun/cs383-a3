// import PREDICTIONS from "./predictions.json";

export const OPTIONS = {
  agentNum: 20,
  phase: 0,
};

// Exporting a p.called 'mySketch'
export const mySketch = (p) => {
  let i = 0
  let image = null;

  p.setup = () => {
    p.createCanvas(500, 500, p.WEBGL);
    p.lights();

    p.camera(0, -100, 100,
           0, 0, 0,
          0, 20, 0);
      image = p.loadImage('test.PNG'); 
    p.noStroke()
  }

  p.draw = () => {
    p.background(200,200)

    p.push()
    p.rotateY(20+i)
    p.texture(image);
    p.plane(20, 20);
    p.pop()

    p.push()
    p.translate(40,0,0)
    p.rotateY(20+i)
    p.plane(20, 20);
    p.pop()
    
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
