module.exports = {
  purge: ["./src/App.vue", "./src/components/**/*.vue"],
  dark: "class",
  experimental: {
    darkModeVariant: true,
  },
  theme: {
    extend: {
      colors: {
        brand1: "#fe887c",
        brand2: "#ee176c",
      },
      boxShadow: {
        brand: `0 5px 15px rgba(238, 23, 108, .25)`,
      },
      transitionProperty: {
        spacing: "transform, margin",
        pop: "opacity, transform",
      },
      backgroundOpacity: {
        "05": "0.05",
      },
      transitionTimingFunction: {
        "inout-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
        "how-the-f-do-i-name-easings": "cubic-bezier(0.7, 0, 0.13, 1)",
        "how-the-f-do-i-name-easings2": "cubic-bezier(0.59, 0.12, 0.34, 0.95)",
      },
      inset: (theme) => ({
        "1/2": "50%",
        ...theme("spacing"),
      }),
      minHeight: {
        screen: "100vh",
      },
      stroke: (theme) => ({ ...theme("colors") }),
      spacing: {
        26: "6.5rem",
        30: "7.5rem",
        52: "13rem",
      },
      scale: {
        95: "0.95",
      },
      overflow: {
        unset: "unset",
      },
    },
    borderRadius: {
      sm: "0.375rem",
      default: "0.5rem",
      xd: "0.9375rem", // xd?
      md: "1.5625rem",
      lg: "1.875rem",
      full: "9999px",
    },
  },
  variants: {
    scale: ["hover", "active", "responsive", "group-hover"],
    opacity: ["group-hover"],
    boxShadow: ["dark"],
    stroke: ["dark"],
  },
};
