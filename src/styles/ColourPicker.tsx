import { COLOUR_OPTIONS } from "./COLOUR_OPTIONS";

export default function ColourPicker({ selected, onSelect }: { selected?: string, onSelect: (selection: string) => void }) {
  return (
    <div className="flex flex-row gap-2">
      {Object.entries(COLOUR_OPTIONS).map(([key, colourOption]) =>
        <button
          key={key}
          className={`w-10 h-10 rounded-full cursor-pointer ${key === selected ? "" : "mt-3"}`}
          onClick={() => onSelect(key)}
          style={
            colourOption.type === "solid"
            ?
              { 
                backgroundColor: colourOption.colour,
                border: colourOption.selectionBorder ? `1px solid ${colourOption.selectionBorder}` : undefined,
              }
            :
              {
                backgroundImage: `linear-gradient(to bottom, ${colourOption.top}, ${colourOption.bottom})`,
              }
          }
        />
      )}
    </div>
  )
}
