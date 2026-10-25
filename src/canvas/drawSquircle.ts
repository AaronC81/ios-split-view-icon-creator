export default function drawSquirclePath(ctx: CanvasRenderingContext2D, dx: number, dy: number, size: number) {
  // Adapted from: https://stackoverflow.com/questions/56676034/html5-canvas-how-to-draw-squircle-with-gradient-border

  // This is Close Enough but not exactly right
  const n = 5;
  const segments = 256;

  const TAU = Math.PI * 2;
  const dim = size / 2;
  const r = dim;

  function coord(t: number) {
    let power = 2 / n;
    let c = Math.cos(t), x = Math.pow(Math.abs(c), power) * Math.sign(c);
    let s = Math.sin(t), y = Math.pow(Math.abs(s), power) * Math.sign(s);
    return { x, y };
  }

  function drawSegmentTo(t: number) {
    let c = coord(t);
    let cx = dim + r * c.x;     // Here, dim is our canvas "radius",
    let cy = dim + r * c.y;     // and r is our circle radius, with
    ctx.lineTo(dx + cx, dy + cy);         // ctx being our canvas context.
  }

  ctx.beginPath();
  ctx.moveTo(dx + dim + r, dy + dim)

  for (let step = TAU / segments, t=step; t<=TAU; t+=step) {
    drawSegmentTo(t);
  }
  ctx.lineTo(dx + dim + r, dy + dim);
}
