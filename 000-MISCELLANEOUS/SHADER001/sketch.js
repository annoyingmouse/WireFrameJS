let ringShader;
let textGfx;

const vert = `
precision mediump float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}
`;

const frag = `
precision mediump float;

uniform sampler2D tex0;
uniform vec2 resolution;
uniform float innerRadius;
uniform float outerRadius;
uniform float rotation;

varying vec2 vTexCoord;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

void main() {
  vec2 uv = vTexCoord;

  // centre coordinates: -1..1
  vec2 p = uv * 2.0 - 1.0;
  p.x *= resolution.x / resolution.y;

  float r = length(p);
  float angle = atan(p.y, p.x) + rotation;

  // angle -> texture x
  float x = fract((angle + PI) / TWO_PI);

  // radius within ring -> texture y
  float y = (r - innerRadius) / (outerRadius - innerRadius);

  if (r < innerRadius || r > outerRadius) {
    discard;
  }

  vec4 col = texture2D(tex0, vec2(x, y));

  // keep transparency from text texture
  gl_FragColor = col;
}
`;
import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";

new p5((p5) => {
  p5.setup = () => {
    p5.createCanvas(700, 700, p5.WEBGL);
    p5.pixelDensity(1);

    ringShader = p5.createShader(vert, frag);

    // Create a flat text-strip image
    textGfx = p5.createGraphics(1600, 160);
    textGfx.clear();
    textGfx.pixelDensity(1);
    textGfx.textAlign(p5.LEFT, p5.CENTER);
    textGfx.textSize(120);
    textGfx.textStyle(p5.BOLD);
    textGfx.fill(256);

    let msg = "                   TEXT WRAPPED";
    let x = 0;

    while (x < textGfx.width) {
      textGfx.text(msg, x, textGfx.height / 2);
      x += textGfx.textWidth(msg);
    }
  }

  p5.draw = () => {
    p5.background(0);

    p5.shader(ringShader);

    ringShader.setUniform("tex0", textGfx);
    ringShader.setUniform("resolution", [p5.width, p5.height]);

    // These are in normalised shader coordinates
    ringShader.setUniform("innerRadius", 0.45);
    ringShader.setUniform("outerRadius", 0.60);

    // Animate rotation
    //ringShader.setUniform("rotation", p5.frameCount * 0.01);

    p5.noStroke();
    p5.rect(-p5.width / 2, -p5.height / 2, p5.width, p5.height);
  }
});