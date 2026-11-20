module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FE8C00",
        meringue: "#FFFDF9",
        marine: "#13294B",
        marineLight: "#1E3D6B",
        clementine: "#FF6A1F",
        clementineLight: "#FF8C55",
        clementine80: "rgba(255, 106, 31, 0.8)",
        white: {
          DEFAULT: "#FFFFFF",
          100: "#FAFAFA",
          200: "#F5F5F5",
        },
        gray: {
          100: "#B0B0B0",
          200: "#878787",
        },
        dark: {
          100: "#181C2E",
        },
        error: "#F14141",
        success: "#2F9B65",
      },
      fontFamily: {
        quicksand: ["Quicksand-Regular", "sans-serif"],
        "quicksand-bold": ["Quicksand-Bold", "sans-serif"],
        "quicksand-semibold": ["Quicksand-SemiBold", "sans-serif"],
        "quicksand-light": ["Quicksand-Light", "sans-serif"],
        "quicksand-medium": ["Quicksand-Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
};
