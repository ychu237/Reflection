

const density = "#%*^!~. ";

let video;
let asciiDiv;
const maxStep = 10;
const minFontSize = 6;
const maxFontSize = minFontSize*maxStep;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(180,110);
  createP("")
  asciiDiv = createDiv();
}

function draw() {
  video.loadPixels();
  video.hide();
  let asciiImage = "";
  const stepSize = floor(map(mouseX, 0, windowWidth, 1,maxStep));
  for (let j = 0; j < video.height; j=j+stepSize) {
    for (let i = 0; i < video.width; i=i+stepSize) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = getGrayScaleColor(r,g,b);
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += '<br/>';
  }
  const pointSize = map(stepSize, 1, maxStep, minFontSize, maxFontSize);
  const lineHeightSize = pointSize*0.75;
  asciiDiv.style('font-size', `${pointSize}pt`);
  asciiDiv.style('line-height', `${lineHeightSize}pt`);
  asciiDiv.html(asciiImage);
}

function mousePressed() {
//saveCanvas('video-ascii', 'jpg');
}

function getGrayScaleColor(r, g, b) {
  // Gray scale based on linear luminance for each color channel:
  // https://en.wikipedia.org/wiki/Grayscale
  return 0.2126 * r + 0.7152 * g + 0.02 * b;
}
