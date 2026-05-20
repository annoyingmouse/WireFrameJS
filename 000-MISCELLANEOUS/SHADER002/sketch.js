let ringShader;
let witchfordImg, archersImg;
let witchfordAngleHalf, archersAngleHalf;

const innerR = 0.665;
const outerR = 0.99;

const vert = `
precision highp float;

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
precision highp float;

uniform sampler2D tex0;
uniform sampler2D tex1;
uniform vec2 resolution;
uniform float innerRadius;
uniform float outerRadius;
uniform float witchfordAngleHalf;
uniform float archersAngleHalf;

varying vec2 vTexCoord;

#define PI     3.14159265359
#define TWO_PI 6.28318530718

// Wrap angle into (-PI, PI]
float wrap(float a) {
  if (a >  PI) return a - TWO_PI;
  if (a < -PI) return a + TWO_PI;
  return a;
}

void main() {
  vec2 uv = vTexCoord;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= resolution.x / resolution.y;

  float r = length(p);
  if (r < innerRadius || r > outerRadius) discard;

  float t = (r - innerRadius) / (outerRadius - innerRadius);
  float angle = atan(p.y, p.x);

  float fw = wrap(angle - PI / 2.0);
  float fa = wrap(angle + PI / 2.0);

  vec4 result = vec4(0.0);

  // Layer 1 — WITCHFORD, single arc centred at top, may extend past 3 and 9 o'clock
  if (abs(fw) <= witchfordAngleHalf) {
    float x = (witchfordAngleHalf - fw) / (2.0 * witchfordAngleHalf);
    result = texture2D(tex0, vec2(x, 1.008 - t));
  }

  // Layer 2 — ARCHERS composited on top
  if (abs(fa) <= archersAngleHalf) {
    float x = (fa + archersAngleHalf) / (2.0 * archersAngleHalf);
    vec4 aCol = texture2D(tex1, vec2(x, t));
    if (aCol.a >= 0.01) result = aCol;
  }

  if (result.a < 0.01) discard;
  gl_FragColor = result;
}
`;

import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";

new p5((p5) => {
  p5.preload = () => {
    witchfordImg = p5.loadImage('WITCHFORD.png');
    archersImg   = p5.loadImage('ARCHERS.png');
  };

  p5.setup = () => {
    p5.createCanvas(5000, 5000, p5.WEBGL);
    p5.pixelDensity(1);
    ringShader = p5.createShader(vert, frag);

    const midR      = (innerR + outerR) / 2;
    const thickness = outerR - innerR;

    witchfordAngleHalf = (witchfordImg.width / witchfordImg.height) * thickness / midR / 2;
    archersAngleHalf   = (archersImg.width  / archersImg.height)  * thickness / midR / 2;
  };

  p5.draw = () => {
    p5.background(255);

    p5.shader(ringShader);
    ringShader.setUniform("tex0", witchfordImg);
    ringShader.setUniform("tex1", archersImg);
    ringShader.setUniform("resolution", [p5.width, p5.height]);
    ringShader.setUniform("innerRadius", innerR);
    ringShader.setUniform("outerRadius", outerR);
    ringShader.setUniform("witchfordAngleHalf", witchfordAngleHalf);
    ringShader.setUniform("archersAngleHalf",   archersAngleHalf);

    p5.noStroke();
    p5.rect(-p5.width / 2, -p5.height / 2, p5.width, p5.height);
  };
});
