import { LAYOUT_OPTIONS } from "./LAYOUT_OPTIONS";

export default function LayoutPicker({ selected, onSelect }: { selected?: string, onSelect: (selection: string) => void }) {
  return (
    <div className="flex flex-col gap-0.5">
      {Object.entries(LAYOUT_OPTIONS).map(([key, layoutOption]) => 
        <label key={key}>
          <input type="radio" name="layout" value={key} className="mr-1" checked={key === selected} onChange={e => onSelect(e.target.value)} />
          {layoutOption.label}
        </label>
      )}
    </div>
  )
}
