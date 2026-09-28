import { test } from "node:test";
import assert from "node:assert/strict";
import { createLcdBridge } from "../script/lcd-bridge.js";

function fakeCanvas(id) {
  return { id };
}

function makeToBlob() {
  const calls = [];
  const toBlob = (canvas) => {
    calls.push(canvas);
    return Promise.resolve({ canvasId: canvas.id });
  };
  return { toBlob, calls };
}

function makeFetch({ delayMs = 0 } = {}) {
  const calls = [];
  const fetchImpl = (url, options) => {
    calls.push({ url, options });
    if (delayMs === 0) {
      return Promise.resolve({ ok: true });
    }
    return new Promise((resolve) => setTimeout(() => resolve({ ok: true }), delayMs));
  };
  return { fetchImpl, calls };
}

async function waitFor(predicate, { timeoutMs = 1000, intervalMs = 5 } = {}) {
  const start = Date.now();
  while (!predicate()) {
    if (Date.now() - start > timeoutMs) {
      throw new Error("waitFor timed out");
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
}

test("exposes the configured width/height", () => {
  const { fetchImpl } = makeFetch();
  const bridge = createLcdBridge({
    endpoint: "http://127.0.0.1:8765",
    width: 480,
    height: 320,
    fetchImpl,
  });
  assert.equal(bridge.width, 480);
  assert.equal(bridge.height, 320);
});

test("sends the first submitted frame immediately", async () => {
  const { fetchImpl, calls } = makeFetch();
  const { toBlob } = makeToBlob();
  const bridge = createLcdBridge({
    endpoint: "http://127.0.0.1:8765",
    width: 480,
    height: 320,
    updateInterval: 1000,
    fetchImpl,
    toBlob,
  });

  bridge.submitCanvas(fakeCanvas("a"));

  await waitFor(() => calls.length === 1);
  assert.equal(calls[0].url, "http://127.0.0.1:8765/frame");
  assert.equal(calls[0].options.method, "POST");
});

test("throttles rapid submits: only the newest frame within the window is eventually sent", async () => {
  const { fetchImpl, calls } = makeFetch();
  const { toBlob, calls: blobCalls } = makeToBlob();
  const updateInterval = 50;
  const bridge = createLcdBridge({
    endpoint: "http://127.0.0.1:8765",
    width: 480,
    height: 320,
    updateInterval,
    fetchImpl,
    toBlob,
  });

  bridge.submitCanvas(fakeCanvas("first")); // sent immediately (no prior send)
  await waitFor(() => calls.length === 1);

  // Submit several frames in quick succession while still inside the throttle window.
  bridge.submitCanvas(fakeCanvas("stale-1"));
  bridge.submitCanvas(fakeCanvas("stale-2"));
  bridge.submitCanvas(fakeCanvas("newest"));

  await waitFor(() => calls.length === 2, { timeoutMs: updateInterval * 10 });

  // Only two canvases should ever have been converted to a blob: the first send and the newest.
  assert.deepEqual(
    blobCalls.map((c) => c.id),
    ["first", "newest"]
  );
});

test("drops stale frames submitted while a send is in flight", async () => {
  const { fetchImpl, calls } = makeFetch({ delayMs: 60 });
  const { toBlob, calls: blobCalls } = makeToBlob();
  const bridge = createLcdBridge({
    endpoint: "http://127.0.0.1:8765",
    width: 480,
    height: 320,
    updateInterval: 10,
    fetchImpl,
    toBlob,
  });

  bridge.submitCanvas(fakeCanvas("in-flight"));
  await waitFor(() => calls.length === 1); // now in flight (fetch hasn't resolved yet)

  bridge.submitCanvas(fakeCanvas("dropped"));
  bridge.submitCanvas(fakeCanvas("kept"));

  await waitFor(() => calls.length === 2, { timeoutMs: 1000 });

  assert.deepEqual(
    blobCalls.map((c) => c.id),
    ["in-flight", "kept"]
  );
});
