import { useEffect, useState } from 'react'
import { type AppStoreResult } from './apps/useAppStoreSearch';
import loadImage from './canvas/loadImage';
import drawSquirclePath from './canvas/drawSquircle';
import SelectedAppCard from './apps/SelectedAppCard';
import AppSelectorDialog from './apps/AppSelectorDialog';
import ColourPicker from './styles/ColourPicker';
import { COLOUR_OPTIONS } from './styles/COLOUR_OPTIONS';
import LayoutPicker from './styles/LayoutPicker';
import { LAYOUT_OPTIONS, layoutIconToCanvasSize, type LayoutOptionIcon } from './styles/LAYOUT_OPTIONS';
import { drawAppIcon } from './canvas/drawAppIcon';


function App() {
  const [leftApp, setLeftApp] = useState<AppStoreResult | undefined>();
  const [rightApp, setRightApp] = useState<AppStoreResult | undefined>();
  const handleSwapApps = () => {
    setLeftApp(rightApp);
    setRightApp(leftApp);
  };

  const [selectingApp, setSelectingApp] = useState<"left" | "right" | undefined>();

  const [colour, setColour] = useState("white");
  const [layout, setLayout] = useState("sideBySide");
  const [shadow, setShadow] = useState(true);

  useEffect(() => {
    (async () => {
      console.log("redraw");

      const canvas = document.getElementById("icon-canvas") as HTMLCanvasElement;

      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, 512, 512);

      ctx.beginPath();
      ctx.save();

      // NOTE: we should not export as squircle, shortcuts will crop it
      drawSquirclePath(ctx, 0, 0, 512);
      ctx.clip();

      const colourOption = COLOUR_OPTIONS[colour];
      if (colourOption.type === "solid") {
        ctx.fillStyle = colourOption.colour;
      } else if (colourOption.type === "gradient") {
        // TODO: is this gradient correct?
        const gradient = ctx.createLinearGradient(256, 0, 256, 512);
        gradient.addColorStop(0, colourOption.top);
        gradient.addColorStop(1, colourOption.bottom);
        ctx.fillStyle = gradient;
      }
      ctx.fillRect(0, 0, 512, 512);
      ctx.restore();

      const layoutOption = LAYOUT_OPTIONS[layout];

      // Drawing right before is important for "overlapping" views
      if (rightApp) {
        await drawAppIcon(ctx, rightApp, layoutOption.right, shadow);
      }
      if (leftApp) {
        await drawAppIcon(ctx, leftApp, layoutOption.left, shadow);
      }
    })();
  }, [leftApp, rightApp, colour, layout, shadow]);

  return (
    <>
      <canvas id="icon-canvas" width="512" height="512" />

      <AppSelectorDialog 
        selecting={selectingApp} 
        onClose={() => setSelectingApp(undefined)}
        onSelect={app => {
          if (selectingApp === "left") {
            setLeftApp(app);
          } else if (selectingApp === "right") {
            setRightApp(app);
          }
        }}
      />

      <div className="flex flex-row gap-2 p-2">
        <SelectedAppCard app={leftApp} onClick={() => setSelectingApp("left")} />
        <button className="cursor-pointer" onClick={handleSwapApps}>Swap</button>
        <SelectedAppCard app={rightApp} onClick={() => setSelectingApp("right")} />
      </div>

      <ColourPicker selected={colour} onSelect={setColour} />
      <LayoutPicker selected={layout} onSelect={setLayout} />

      <label>
        <input type="checkbox" className="mr-1" checked={shadow} onChange={e => setShadow(e.target.checked)} />
        Shadows
      </label>
    </>
  )
}

export default App
