import { COLOUR_OPTIONS } from "./COLOUR_OPTIONS";

export default function ColourPicker({ selected, onSelect }: { selected?: string, onSelect: (selection: string) => void }) {
  return (
    <div>
      <div className="grid grid-cols-5 gap-2 w-full place-items-center">
        {Object.entries(COLOUR_OPTIONS).map(([key, colourOption]) =>
          <button
            key={key}
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => onSelect(key)}
            style={
                colourOption.type === "gradient"
                ? {
                    backgroundImage: `linear-gradient(to bottom, ${colourOption.top}, ${colourOption.bottom})`,
                    outline: key === selected
                      ? `3px solid ${colourOption.selectedBorder ?? "black"}`
                      : (colourOption.optionBorder ? `1px solid ${colourOption.optionBorder}` : undefined),
                  }
                : {
                  outline: key === selected
                    ? `3px solid black`
                    : "1px solid #aaa",
                }
            }
          >
            {colourOption.type === "custom" && "?"}
          </button>
        )}
      </div>
    </div>
  )
}
