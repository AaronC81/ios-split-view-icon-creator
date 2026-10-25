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
import drawSplitIcon from './canvas/drawSplitIcon';

const CANVAS_SIZE = 1024;

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
      const canvas = document.getElementById("icon-canvas") as HTMLCanvasElement;
      
      await drawSplitIcon(
        canvas.getContext("2d")!,
        CANVAS_SIZE,
        true,
        leftApp,
        rightApp,
        COLOUR_OPTIONS[colour]!,
        LAYOUT_OPTIONS[layout]!,
        shadow,
      );
    })();
  }, [leftApp, rightApp, colour, layout, shadow]);

  const handleDownload = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    
    const ctx = canvas.getContext("2d")!;
    await drawSplitIcon(
      ctx,
      CANVAS_SIZE,
      false,
      leftApp,
      rightApp,
      COLOUR_OPTIONS[colour]!,
      LAYOUT_OPTIONS[layout]!,
      shadow,
    );

    const link = document.createElement('a');
    link.download = `split-icon.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  // TODO: two columns on wide enough display (like Duo!), one otherwise
  return (
    <>
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

      <div className="mx-auto">
        {/* TODO: add icon */}
        <button
          className="w-full max-w-80 p-2 rounded-xl bg-blue-300"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>

      <canvas id="icon-canvas" width={CANVAS_SIZE} height={CANVAS_SIZE} className="w-50" />
    </>
  )
}

export default App
