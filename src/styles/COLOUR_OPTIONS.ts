export type ColourOption = {
  type: "custom",
  colour?: string;
} | {
  type: "gradient",
  top: string,
  bottom: string,
  optionBorder?: string;
  selectedBorder?: string;
}

export const COLOUR_OPTIONS: Record<string, ColourOption> = {
  "gRed": { type: "gradient", top: "#DE6F70", bottom: "#D85B5B" },
  "gOrange": { type: "gradient", top: "#EC8B6F", bottom: "#EA7B5B" },
  "gLightOrange": { type: "gradient", top: "#E5A861", bottom: "#E5A861" },
  "gYellow": { type: "gradient", top: "#E1C341", bottom: "#DCBA3E" },
  "gGreen": { type: "gradient", top: "#65C068", bottom: "#57B553" },
  "gBlueGreen": { type: "gradient", top: "#5BC7AD", bottom: "#57BFA1" },
  "gLightBlue": { type: "gradient", top: "#86C6E9", bottom: "#76BEE6" },
  "gBlue": { type: "gradient", top: "#4C92F7", bottom: "#3B82F6" },
  "gDarkBlue": { type: "gradient", top: "#5A70C0", bottom: "#425BB8" },
  "gPurple": { type: "gradient", top: "#7E5BB3", bottom: "#6C43A8" },
  "gMagenta": { type: "gradient", top: "#AB7AD5", bottom: "#9F67CF" },
  "gPink": { type: "gradient", top: "#DD8AC8", bottom: "#D979BF" },
  "gGray": { type: "gradient", top: "#8A929B", bottom: "#79828C" },
  "gGreenGray": { type: "gradient", top: "#9BAD9D", bottom: "#8DA28F" },
  "gCopper": { type: "gradient", top: "#B9A68D", bottom: "#AF997C" },

  // TODO: not implemented yet
  // "custom": { type: "custom" },
}
