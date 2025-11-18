(() => {
  setInterval(() => {
    const allPositions = document.getElementById("allPositions");
    const currentPosition = Number.parseInt(
      allPositions.getAttribute("position"),
      10,
    );
    if (isNaN(currentPosition)) {
      allPositions.setAttribute("position", 0);
    } else {
      if (currentPosition < 15) {
        allPositions.setAttribute("position", currentPosition + 1);
      } else {
        allPositions.setAttribute("position", 0);
      }
    }
  }, 1000);
  const production = document.getElementById("production");
  const hideDot = document.getElementById("hide-dot");
  production.addEventListener("change", (e) => {
    const kolams = document.querySelectorAll("wc-kolam");
    if (e.target.checked) {
      [...kolams].forEach((kolam) => kolam.setAttribute("production", ""));
    } else {
      [...kolams].forEach((kolam) => kolam.removeAttribute("production"));
    }
  });
  hideDot.addEventListener("change", (e) => {
    const kolams = document.querySelectorAll("wc-kolam");
    if (e.target.checked) {
      [...kolams].forEach((kolam) => kolam.setAttribute("hide-dot", ""));
    } else {
      [...kolams].forEach((kolam) => kolam.removeAttribute("hide-dot"));
    }
  });

  const lineColour = document.getElementById("line-colour");
  const dotColour = document.getElementById("dot-colour");
  const lineWidth = document.getElementById("line-width");
  const grid = document.querySelector(".nine_by_nine");
  const gridElements = [...grid.children];
  gridElements.forEach((gridElement) => {
    gridElement.style.cursor = "pointer";
    gridElement.addEventListener("click", (e) => rotateElement(e.target));
  });
  const rotateElement = (el) => {
    if (el instanceof HTMLDivElement) {
      const kolam = document.createElement("wc-kolam");
      if (production.checked) {
        kolam.setAttribute("production", "");
      }
      if (hideDot.checked) {
        kolam.setAttribute("hide-dot", "");
      }
      kolam.setAttribute("width", "66");
      kolam.setAttribute("colour", lineColour.value);
      kolam.setAttribute("dot-colour", dotColour.value);
      kolam.setAttribute("position", "0");
      kolam.setAttribute("line-width", lineWidth.value);
      kolam.style.cursor = "pointer";
      kolam.addEventListener("click", (e) => rotateElement(e.target));
      el.replaceWith(kolam);
    } else {
      if (Number.parseInt(el.getAttribute("position"), 10) < 15) {
        el.setAttribute(
          "position",
          Number.parseInt(el.getAttribute("position"), 10) + 1,
        );
      } else {
        const div = document.createElement("div");
        div.style.cursor = "pointer";
        div.addEventListener("click", (e) => rotateElement(e.target));
        el.replaceWith(div);
      }
    }
  };
  lineColour.addEventListener("change", () => {
    const grid = document.querySelector(".nine_by_nine");
    const gridElements = [...grid.children];
    gridElements.forEach((gridElement) => {
      gridElement.setAttribute("colour", lineColour.value);
    });
  });
  dotColour.addEventListener("change", () => {
    const grid = document.querySelector(".nine_by_nine");
    const gridElements = [...grid.children];
    gridElements.forEach((gridElement) => {
      gridElement.setAttribute("dot-colour", dotColour.value);
    });
  });
  lineWidth.addEventListener("change", () => {
    const grid = document.querySelector(".nine_by_nine");
    const gridElements = [...grid.children];
    gridElements.forEach((gridElement) => {
      gridElement.setAttribute("line-width", lineWidth.value);
    });
  });
  const printBtn = document.getElementById("printBtn");
  const source = document.getElementById("source");
  printBtn.addEventListener("click", () => {
    html2canvas(source).then(function (canvas) {
      document.body.appendChild(canvas);
    });
  });
})();
