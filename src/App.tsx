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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft, faDownload } from '@fortawesome/free-solid-svg-icons'
import exampleImage from "./example.jpg"

const CANVAS_SIZE = 1024;

function App() {
  const [leftApp, setLeftApp] = useState<AppStoreResult | undefined>();
  const [rightApp, setRightApp] = useState<AppStoreResult | undefined>();
  const handleSwapApps = () => {
    setLeftApp(rightApp);
    setRightApp(leftApp);
  };

  const [selectingApp, setSelectingApp] = useState<"left" | "right" | undefined>();

  const [colour, setColour] = useState("gRed");
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

    // iOS Safari can't download large data: URLs, so use a blob URL instead
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(b => resolve(b!), "image/png");
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = `split-icon.png`;
    link.href = url;
    link.click();
  };

  return (
    <>
      <h1 className="text-2xl font-bold p-2">iOS Split View Icon Creator</h1>

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
        <button className="cursor-pointer" onClick={handleSwapApps}>
          <FontAwesomeIcon icon={faRightLeft} />
        </button>
        <SelectedAppCard app={rightApp} onClick={() => setSelectingApp("right")} />
      </div>

      <div className="p-2 flex flex-col md:flex-row gap-4 justify-center">
        <ColourPicker selected={colour} onSelect={setColour} />
        <div>
          <LayoutPicker selected={layout} onSelect={setLayout} />
          <label>
            <input type="checkbox" className="mr-1 mt-5" checked={shadow} onChange={e => setShadow(e.target.checked)} />
            Icon shadows
          </label>
        </div>
      </div>

      <div className="p-2 flex flex-col w-full items-center gap-4">
        <canvas id="icon-canvas" width={CANVAS_SIZE} height={CANVAS_SIZE} className="w-50" />

        <button
          className="mx-auto w-full md:max-w-80 p-2 rounded-xl bg-blue-300 dark:bg-blue-600 shadow font-bold border-2 border-blue-400 dark:border-blue-800"
          onClick={handleDownload}
        >
          <FontAwesomeIcon icon={faDownload} />
          Download
        </button>

        <details className="max-w-130">
          <summary>What is this, and how do I use it?</summary>

          <p>This little site lets you create a custom iOS icon which shows two app icons together. You can use this to represent a pair of apps for Split View on the iPhone Duo:</p>

          <img src={exampleImage} alt="An iOS Home Screen icon labelled 'Maps + Safari'" className="h-[10em] mx-auto my-2" />

          <p>You can't natively save Split View app pairs to your Home Screen. As a workaround, you can launch Split View from a Shortcut.</p>

          <ol className="list-decimal ml-5 mt-2">
            <li>Create a Shortcut which uses the <i>Split screen between ...</i> action.</li>
            <li>Open the Shortcut's menu and choose <i>Add to Home Screen</i>.</li>
            <li>Use the <i>Image</i> tab to select the downloaded icon.</li>
          </ol>
        </details>
      </div>
    </>
  )
}

export default App
