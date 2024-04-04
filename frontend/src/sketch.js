// import PREDICTIONS from "./predictions.json";

export const OPTIONS = {
  agentNum: 20,
  phase: 0,
};


// Exporting a p.called 'mySketch'
export const mySketch = (p) => {
  let ii = 1

  let image = null;
  let images = []

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.lights();


    const getRandomSpeed = () => {
      return p.random(0.005, 0.03)
    }

    const getRandomHeight = () => {
      return 180 + p.random(-100,100)
    }

    p.camera(0, 0, -900,
           0, 0, 0,
          0, 1, 0);

    image = p.loadImage('test.PNG'); 
    images.push({
      data: image,
      rotation: 0,
      rotationCoeff: getRandomSpeed(),
      height: getRandomHeight(),
    })

    images.push({
      data: image,
      rotation: 0,
      rotationCoeff: getRandomSpeed(),
      height: getRandomHeight(),
    })

    images.push({
      data: image,
      rotation: 0,
      rotationCoeff: getRandomSpeed(),
      height: getRandomHeight(),
    })

    p.noStroke()
  }

  p.draw = () => {
    p.background(0)

    images.forEach((imageObj, idx) => {
      const { data, rotationCoeff } = imageObj

      p.push()
      p.translate(480-(idx*470),0,0)
  
      p.push()
      p.stroke('#ebb434');
      p.strokeWeight(2);
      p.line(0, imageObj.height - 200, 0, -1000);
      p.pop()
  
      p.push()
      p.rotateY(20+imageObj.rotation)
      p.texture(data);
      p.translate(0,imageObj.height)
      p.plane(450, 450);
      p.pop()
      p.pop()
      imageObj.rotation += rotationCoeff
    })

    ii += 0
  }
  p.mousePressed = () => {
    // p.setTint([255, 0, 0]);
  };

  p.getCorrespondingFrame = (x) => {
  };

  p.windowResized = () => {
  };
};
