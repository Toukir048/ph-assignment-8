const config = {
  content: [
    "./app/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
    "./lib/**/*.{js,jsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17212b",
        ember: "#f97316",
        mint: "#1fbf9b",
        citrus: "#f7c948",
        cloud: "#f7f4ef"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(23, 33, 43, 0.12)"
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
  daisyui: {
    themes: [
      {
        skillsphere: {
          primary: "#f97316",
          secondary: "#1fbf9b",
          accent: "#f7c948",
          neutral: "#17212b",
          "base-100": "#fffaf3",
          info: "#3b82f6",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444"
        }
      }
    ]
  }
};

export default config;
