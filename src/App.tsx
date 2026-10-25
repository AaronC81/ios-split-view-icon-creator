import { useEffect, useRef, useState } from 'react'
import useAppStoreSearch, { type AppStoreResult } from './apps/useAppStoreSearch';
import loadImage from './canvas/loadImage';
import drawSquirclePath from './canvas/drawSquircle';
import AppSelector from './apps/AppSelectorDialog';
import SelectedAppCard from './apps/SelectedAppCard';
import AppSelectorDialog from './apps/AppSelectorDialog';

function App() {
  const [leftApp, setLeftApp] = useState<AppStoreResult | undefined>();
  const [rightApp, setRightApp] = useState<AppStoreResult | undefined>();
  const handleSwapApps = () => {
    setLeftApp(rightApp);
    setRightApp(leftApp);
  };

  const [selectingApp, setSelectingApp] = useState<"left" | "right" | undefined>();

  useEffect(() => {
    (async () => {
      console.log("redraw");

      const canvas = document.getElementById("icon-canvas") as HTMLCanvasElement;

      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, 512, 512);

      ctx.beginPath();
      ctx.save();

      drawSquirclePath(ctx, 0, 0, 512);
      ctx.clip();

      ctx.fillStyle = "#007AFF";
      ctx.fillRect(0, 0, 512, 512);

        ctx.restore();

      if (leftApp) {
        ctx.beginPath();
        ctx.save();

        drawSquirclePath(ctx, 48, 48, 200);
        ctx.clip();

        const image = await loadImage(leftApp?.iconUrl512);
        ctx.drawImage(image, 48, 48, 200, 200);

        ctx.restore();
      }

      if (rightApp) {
        ctx.beginPath();
        ctx.save();

        drawSquirclePath(ctx, 264, 264, 200);
        ctx.clip();

        const image = await loadImage(rightApp?.iconUrl512);
        ctx.drawImage(image, 264, 264, 200, 200);

        ctx.restore();
      }
    })();
  }, [leftApp, rightApp]);

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
    </>
  )
}

export default App
