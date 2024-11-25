import { Swappable, Plugins } from "https://cdn.skypack.dev/@shopify/draggable";

export function GridLayout() {
  const containerSelector = "#fieldSet .BlockWrapper";
  const containers = document.querySelectorAll(containerSelector);

  if (containers.length === 0) {
    return false;
  }

  const swappable = new Swappable(containers, {
    draggable: ".isDraggable",
    handle: ".label",
    mirror: {
      appendTo: containerSelector,
      constrainDimensions: true,
    },
    plugins: [Plugins.ResizeMirror],
  });

  return swappable;
}
