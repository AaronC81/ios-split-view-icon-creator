export type ColourOption = {
  type: "solid",
  colour: string,
  selectionBorder?: string;
} | {
  type: "gradient",
  top: string,
  bottom: string,
}

export const COLOUR_OPTIONS: Record<string, ColourOption> = {
  "white": { type: "solid", colour: "#FFFFFF", selectionBorder: "#AAA" },
  "black": { type: "solid", colour: "#000000" },

  "gRed": { type: "gradient", top: "#DE6F70", bottom: "#D85B5B" },

  "gBlue": { type: "gradient", top: "#4C92F7", bottom: "#3B82F6" },

  // TODO: rest of colours
}
