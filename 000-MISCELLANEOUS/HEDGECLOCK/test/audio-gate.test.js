import { test } from "node:test";
import assert from "node:assert/strict";
import { isAudioEnabled, setAudioEnabled } from "../script/audio-gate.js";

test("audio is enabled by default (normal web behaviour)", () => {
  assert.equal(isAudioEnabled(), true);
});

test("setAudioEnabled(false) disables audio, as LCD mode requires", () => {
  setAudioEnabled(false);
  try {
    assert.equal(isAudioEnabled(), false);
  } finally {
    setAudioEnabled(true); // restore default for other tests
  }
});

test("setAudioEnabled(true) restores the default web behaviour", () => {
  setAudioEnabled(false);
  setAudioEnabled(true);
  assert.equal(isAudioEnabled(), true);
});
