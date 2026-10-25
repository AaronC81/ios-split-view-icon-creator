export type LayoutOptionIcon = {
  x: number,
  y: number,
  size: number,
}

export type LayoutOption = {
  label: string,
  left: LayoutOptionIcon,
  right: LayoutOptionIcon,
};

export const LAYOUT_OPTIONS: Record<string, LayoutOption> = {
  "sideBySide": {
    label: "Side-by-side",
    left: {
      x: 0.26,
      y: 0.5,
      size: 0.45,
    },
    right: {
      x: 0.74,
      y: 0.5,
      size: 0.45,
    },
  },
  "diagonal": {
    label: "Diagonal",
    left: {
      x: 0.29,
      y: 0.29,
      size: 0.43,
    },
    right: {
      x: 0.71,
      y: 0.71,
      size: 0.43,
    }
  },
  "diagonalOverlapping": {
    label: "Diagonal, overlapping",
    left: {
      x: 0.35,
      y: 0.35,
      size: 0.55,
    },
    right: {
      x: 0.65,
      y: 0.65,
      size: 0.55,
    }
  },
}

export function layoutIconToCanvasSize(icon: LayoutOptionIcon, canvasSize: number) {
  const iconCanvasSize = icon.size * canvasSize;

  return {
    x: icon.x * canvasSize - iconCanvasSize / 2,
    y: icon.y * canvasSize - iconCanvasSize / 2,
    size: iconCanvasSize,
  }
}
