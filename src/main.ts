import p5 from "p5";

const sketchDiv = document.getElementById("sketch") || undefined;

new p5((sketch: p5) => {
  sketch.setup = () => {
    sketch.createCanvas(1024, 512);
    sketch.colorMode(sketch.HSL);
    sketch.background(191, 93, 40);
  };

  sketch.draw = () => {
    sketch.fill(0, 0, 49);
    sketch.noStroke();
    sketch.rect(sketch.width / 2 - 50, sketch.height / 2 - 50, 100, 100);
  };
}, sketchDiv);
