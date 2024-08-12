import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('../app/img/season3wallpaper.jpg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
