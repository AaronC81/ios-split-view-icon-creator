import type { AppStoreResult } from "../apps/useAppStoreSearch";
import { type ColourOption } from "../styles/COLOUR_OPTIONS";
import { type LayoutOption } from "../styles/LAYOUT_OPTIONS";
import drawAppIcon from "./drawAppIcon";
import drawSquirclePath from "./drawSquircle";

export default async function drawSplitIcon(
  ctx: CanvasRenderingContext2D,
  size: number,
  squircled: boolean,
  leftApp: AppStoreResult | undefined,
  rightApp: AppStoreResult | undefined,
  colour: ColourOption,
  layout: LayoutOption,
  shadow: boolean,
) {
  ctx.clearRect(0, 0, size, size);
  
  ctx.beginPath();
  ctx.save();

  if (squircled) {
    drawSquirclePath(ctx, 0, 0, size);
    ctx.clip();
  }

  if (colour.type === "custom") {
    ctx.fillStyle = colour.colour!;
  } else if (colour.type === "gradient") {
    const gradient = ctx.createLinearGradient(size / 2, 0, size / 2, size);
    gradient.addColorStop(0, colour.top);
    gradient.addColorStop(1, colour.bottom);
    ctx.fillStyle = gradient;
  }
  ctx.fillRect(0, 0, size, size);
  ctx.restore();

  // Drawing right before is important for "overlapping" views
  if (rightApp) {
    await drawAppIcon(ctx, size, rightApp, layout.right, shadow);
  }
  if (leftApp) {
    await drawAppIcon(ctx, size, leftApp, layout.left, shadow);
  }
}
