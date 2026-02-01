export interface Theme {
  name: string;
  colors: {
    background: string;
    backgroundSecondary: string;
    border: string;
    text: string;
    textMuted: string;
    primary: string;
    secondary: string;
    accent: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    cursor: string;
    grid: string;
  };
}

export const themes: Record<string, Theme> = {
  amber: {
    name: "Amber Phosphor",
    colors: {
      background: "#1a1a1a",
      backgroundSecondary: "#252525",
      border: "#3d3d3d",
      text: "#ffb000",
      textMuted: "#996800",
      primary: "#ffb000",
      secondary: "#cc8c00",
      accent: "#ffcc00",
      error: "#ff4444",
      success: "#88bb44",
      warning: "#ffaa00",
      info: "#66aaff",
      cursor: "#ffb000",
      grid: "rgba(255, 176, 0, 0.02)",
    },
  },
  green: {
    name: "Green Phosphor",
    colors: {
      background: "#0d1a0d",
      backgroundSecondary: "#142614",
      border: "#2d4a2d",
      text: "#33ff33",
      textMuted: "#1a801a",
      primary: "#33ff33",
      secondary: "#22cc22",
      accent: "#66ff66",
      error: "#ff3333",
      success: "#44ff44",
      warning: "#ffff33",
      info: "#33ffff",
      cursor: "#33ff33",
      grid: "rgba(51, 255, 51, 0.02)",
    },
  },
  white: {
    name: "White Phosphor",
    colors: {
      background: "#1a1a1a",
      backgroundSecondary: "#252525",
      border: "#3d3d3d",
      text: "#e0e0e0",
      textMuted: "#808080",
      primary: "#e0e0e0",
      secondary: "#a0a0a0",
      accent: "#ffffff",
      error: "#cc3333",
      success: "#55aa55",
      warning: "#cc9900",
      info: "#6699cc",
      cursor: "#e0e0e0",
      grid: "rgba(224, 224, 224, 0.02)",
    },
  },
  ibm: {
    name: "IBM Blue",
    colors: {
      background: "#0a0a14",
      backgroundSecondary: "#12121f",
      border: "#2a2a3d",
      text: "#a0c0ff",
      textMuted: "#6080aa",
      primary: "#a0c0ff",
      secondary: "#80a0dd",
      accent: "#c0d8ff",
      error: "#ff6666",
      success: "#66cc88",
      warning: "#ffcc66",
      info: "#88ccff",
      cursor: "#a0c0ff",
      grid: "rgba(160, 192, 255, 0.02)",
    },
  },
  paper: {
    name: "Paper White",
    colors: {
      background: "#f5f5f0",
      backgroundSecondary: "#ebebe5",
      border: "#d0d0c8",
      text: "#2a2a2a",
      textMuted: "#6a6a6a",
      primary: "#2a2a2a",
      secondary: "#4a4a4a",
      accent: "#1a1a1a",
      error: "#aa3333",
      success: "#338833",
      warning: "#aa6600",
      info: "#3355aa",
      cursor: "#2a2a2a",
      grid: "rgba(42, 42, 42, 0.03)",
    },
  },
  solarized: {
    name: "Solarized Dark",
    colors: {
      background: "#002b36",
      backgroundSecondary: "#073642",
      border: "#586e75",
      text: "#839496",
      textMuted: "#586e75",
      primary: "#b58900",
      secondary: "#268bd2",
      accent: "#cb4b16",
      error: "#dc322f",
      success: "#859900",
      warning: "#b58900",
      info: "#2aa198",
      cursor: "#b58900",
      grid: "rgba(131, 148, 150, 0.03)",
    },
  },
  monochrome: {
    name: "Monochrome",
    colors: {
      background: "#000000",
      backgroundSecondary: "#111111",
      border: "#333333",
      text: "#bbbbbb",
      textMuted: "#666666",
      primary: "#ffffff",
      secondary: "#999999",
      accent: "#dddddd",
      error: "#ff0000",
      success: "#00ff00",
      warning: "#ffff00",
      info: "#00ffff",
      cursor: "#ffffff",
      grid: "rgba(187, 187, 187, 0.02)",
    },
  },
};

export const defaultTheme = "amber";
