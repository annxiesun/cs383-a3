// import PREDICTIONS from "./predictions.json";

export const OPTIONS = {
  agentNum: 20,
  phase: 0,
};


// Exporting a p.called 'mySketch'
export const mySketch = (p) => {

  let image = null;
  let images = []

  const getRandomSpeed = () => {
    return p.random(0.005, 0.03)
  }

  const getRandomHeight = () => {
    return 130 
  }

  const addNewImage = (base64String) => {
    const imgData = p.loadImage(base64String);
    images.push({
      data: imgData,
      rotation: 0,
      rotationCoeff: getRandomSpeed(),
      height: getRandomHeight(),
      xTrans: -470,
      zTrans: 150,
      opacity: 0,
    })

    let count = 1
    const interval = setInterval(() => {
      images[0].xTrans += 5
      images[0].zTrans += 4
      images[0].opacity -= 2

      images[1].xTrans += 3
      images[1].zTrans -= 1
      images[1].opacity += 2

      count += 1
      if(count == 150) {
        clearInterval(interval)
        images.shift()
      }

    }, 25)
  }
  p.addNewImage = addNewImage

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.lights();

    p.camera(0, 0, -900,
           0, 0, 0,
          0, 1, 0);

    image = p.loadImage('test.PNG'); 
    images.push({
      data: image,
      rotation: 0,
      rotationCoeff: getRandomSpeed(),
      height: getRandomHeight(),
      xTrans: 0,
      zTrans: 0,
      opacity: 255,
    })

    p.noStroke()
  }

  p.draw = () => {
    p.background(0)

    images.forEach((imageObj) => {
      const { data, rotationCoeff, xTrans, zTrans, opacity } = imageObj
      const xPos = xTrans
      const zPos = zTrans

      p.push()
      p.tint(255, opacity)
      p.translate(xPos,0,zPos)
  
      p.push()
      let col = p.color('#ebb434')
      col.setAlpha(opacity)
      p.stroke(col);
      p.strokeWeight(2);
      p.line(0, imageObj.height-200, 0, -1000);
      p.pop()
  
      p.push()
      p.rotateY(20+imageObj.rotation)
      p.texture(data);
      p.translate(0,imageObj.height)
      p.plane(650, 650);
      p.pop()
      p.pop()
      imageObj.rotation += rotationCoeff
    })
  }
  p.mousePressed = () => {
    p.clear();
    p.background(0)
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  };

  p.windowResized = () => {
  };

};

document.addEventListener('fullscreenchange', () => {
  console.log("hello")
}, false);


document.addEventListener('mozfullscreenchange',() => {
  console.log("hello")
}, false);
// document.addEventListener('MSFullscreenChange', exitHandler, false);
// document.addEventListener('webkitfullscreenchange', exitHandler, false);

