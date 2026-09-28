// Pure, dependency-free toggle for HEDGECLOCK's rustle sound effects, so LCD
// mode can disable audio without loading p5/p5.sound, and so the toggle
// itself is unit-testable without a browser.
let audioEnabled = true;

export function isAudioEnabled() {
  return audioEnabled;
}

export function setAudioEnabled(enabled) {
  audioEnabled = enabled;
}
