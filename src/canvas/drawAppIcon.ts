import type { AppStoreResult } from "../apps/useAppStoreSearch";
import { type LayoutOptionIcon, layoutIconToCanvasSize } from "../styles/LAYOUT_OPTIONS";
import drawSquirclePath from "./drawSquircle";
import loadImage from "./loadImage";

export default async function drawAppIcon(ctx: CanvasRenderingContext2D, canvasSize: number, app: AppStoreResult, icon: LayoutOptionIcon, shadow: boolean) {
  const { x, y, size } = layoutIconToCanvasSize(icon, canvasSize);
  const image = await loadImage(app.iconUrl512);

  if (shadow) {
    ctx.save();
    drawSquirclePath(ctx, x, y, size);
    ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
    ctx.shadowBlur = size * 0.1;
    ctx.shadowOffsetY = size * 0.02;
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.restore();
  }

  ctx.save();
  drawSquirclePath(ctx, x, y, size);
  ctx.clip();
  ctx.drawImage(image, x, y, size, size);
  ctx.restore();
}
