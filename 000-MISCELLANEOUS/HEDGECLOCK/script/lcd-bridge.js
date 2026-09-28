// Minimal client for the local LCD bridge: rate-limits canvas frames to
// `updateInterval` and always keeps only the newest frame if one is still
// in flight, so the bridge never receives a backlog of stale frames.

export function createLcdBridge({
  endpoint,
  width,
  height,
  updateInterval = 250,
  fetchImpl = typeof fetch !== "undefined" ? fetch : undefined,
  toBlob,
} = {}) {
  if (!endpoint) {
    throw new Error("createLcdBridge: endpoint is required");
  }
  if (!fetchImpl) {
    throw new Error("createLcdBridge: fetchImpl is required (no global fetch available)");
  }

  const frameUrl = `${endpoint.replace(/\/$/, "")}/frame`;

  let inFlight = false;
  let pendingCanvas = null;
  let timerId = null;
  let lastSendAt = 0;

  const canvasToBlob = (canvas) =>
    typeof toBlob === "function"
      ? toBlob(canvas)
      : new Promise((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("canvas.toBlob produced no blob"));
            }
          }, "image/png");
        });

  function send(canvas) {
    inFlight = true;
    lastSendAt = Date.now();
    return canvasToBlob(canvas)
      .then((blob) =>
        fetchImpl(frameUrl, {
          method: "POST",
          headers: { "Content-Type": "image/png" },
          body: blob,
        })
      )
      .catch(() => {
        // The clock keeps rendering locally even if the bridge is unreachable; just drop this frame.
      })
      .finally(() => {
        inFlight = false;
        scheduleNext();
      });
  }

  function scheduleNext() {
    if (pendingCanvas === null || inFlight || timerId !== null) {
      return;
    }
    const elapsed = Date.now() - lastSendAt;
    if (elapsed >= updateInterval) {
      const canvas = pendingCanvas;
      pendingCanvas = null;
      send(canvas);
    } else {
      timerId = setTimeout(() => {
        timerId = null;
        scheduleNext();
      }, updateInterval - elapsed);
    }
  }

  return {
    submitCanvas(canvas) {
      pendingCanvas = canvas;
      scheduleNext();
    },
    get width() {
      return width;
    },
    get height() {
      return height;
    },
  };
}
