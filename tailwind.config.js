/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        "bg-alt": "#F6F6F4",
        ink: "#0D0D10",
        "ink-soft": "#5B5B63",
        accent: "#E6401C",
        "accent-soft": "#FCE7E2",
        line: "#E7E7E4",
        track: {
          podcast: "#2E6F6E",
          "action-thriller": "#8A1E1E",
          "3d-animation": "#5B4B9E",
          "short-film": "#B4791F",
          advertisement: "#1F5FA8",
          illustration: "#C23B7B",
          "web-development": "#2B8A3E",
        },
      },
      fontFamily: {
        display: ["'Clash Display'", "'General Sans'", "sans-serif"],
        body: ["Inter", "'IBM Plex Sans'", "sans-serif"],
      },
      boxShadow: {
        "btn-rest": "0 6px 0 0 rgba(13,13,16,0.85)",
        "btn-press": "0 2px 0 0 rgba(13,13,16,0.85)",
      },
    },
  },
  plugins: [],
};
