const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      nunito: ["Nunito Sans"],
      poppins: ["Poppins"],
      montserrat: ["Montserrat"],
      inter: ["Inter"],
    },
    screens: {
      zero: "0px",
      sm: "576px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1920px",
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "576px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        "2xl": "1920px",
      },
    },
    colors: {
      theme: "#2F3454",
      transparent: "transparent",
      primary: "#D0CBAB",
      secondary: "#293241",
      background: "#FAFAFA",
      notification: "#AD0909",
      green: "green",
      red: "red",

      /* Redesigned color system */

      // Brand color (Odf = Outdefine)
      "odf-light": "#D2D6ED ",
      "odf-hue3": "#9DA4D3",
      "odf-hue2": "#656C99",
      "odf-hue1": "#47508A",
      odf: "#2F3454",
      "orange-hue": "#FFC6A3",
      "orange-hue-1": "rgba(255, 145, 77, 0.75)",
      orange: "#FF8134",
      "coral-red-hue": "#FFC8C8",
      "coral-red": "#FF5757",
      "blue2-hue": "#D9D9FF",
      blue2: "#5F5FFF",
      "banner-orange": "#FF914DBF",

      // Gray palette
      white: "#FFFFFF",
      "light-gray": "#D6D7DA",
      "lighter-gray": "#F9F9F9",
      "darker-gray": "#757A80",
      "dark-gray": "#A9ACB1",
      "inactive-gray": "#8A8A8A",

      "text-black": "#070709",
      "light-black": "#2D2F33",
      "lighter-black": "#4E5258",
      black: "#161719",

      purple: "#8C52FF",

      // Gradient

      // UI colors
      success: "#26993F",
      error: "#D32F2F",
      active: "#FF5757",
      inactive: "#2F3454",
    },
    extend: {
      boxShadow: {
        xl: "0px 16px 32px rgba(0, 0, 0, 0.1)",
        "3xl":
          "2px 2px 4px rgba(114, 142, 171, 0.1), -6px -6px 20px #FFFFFF, 4px 4px 20px rgba(111, 140, 176, 0.41)",

        // Redesign shadow system
        cta: "0px 1px 5px rgba(0, 0, 0, 0.1)",
        modal: "0px 12px 120px rgba(119, 121, 128, 0.1)",
        card: "0px 4px 20px rgba(0, 0, 0, 0.04)",
        "mobile-nav": "0px -3px 10px rgba(0, 0, 0, 0.05)",
        "mobile-header": "0px 3px 10px rgba(0, 0, 0, 0.05)",
      },
      fontSize: {
        h1: [
          "72px",
          {
            lineHeight: "76px",
            letterSpacing: "-1.5px",
            fontWeight: "700",
          },
        ],
        h2: [
          "56px",
          {
            lineHeight: "60px",
            letterSpacing: "-0.5px",
          },
        ],
        h3: [
          "48px",
          {
            lineHeight: "52px",
          },
        ],
        h4: [
          "32px",
          {
            lineHeight: "36px",
            letterSpacing: "0.25px",
          },
        ],
        h5: [
          "24px",
          {
            lineHeight: "28px",
          },
        ],
        h6: [
          "20px",
          {
            lineHeight: "24px",
            letterSpacing: "0.15px",
          },
        ],
        subtitle1: [
          "18px",
          {
            lineHeight: "22px",
            letterSpacing: "0.15px",
          },
        ],
        subtitle2: [
          "16px",
          {
            lineHeight: "22px",
            letterSpacing: "0.15px",
          },
        ],
        p1: [
          "16px",
          {
            lineHeight: "22px",
            letterSpacing: "0.1px",
          },
        ],
        p2: [
          "14px",
          {
            lineHeight: "20px",
          },
        ],
        p3: [
          "12px",
          {
            lineHeight: "18px",
          },
        ],
        button: [
          "14px",
          {
            lineHeight: "16px",
            fontFamily: "Poppins",
            fontWeight: "600",
          },
        ],
        caption: [
          "10px",
          {
            lineHeight: "12px",
            letterSpacing: "0.2px",
            fontFamily: "Poppins",
          },
        ],
        label: [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0.25px",
            fontFamily: "Poppins",
          },
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
