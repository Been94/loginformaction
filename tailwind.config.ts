import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        "311": "3fr repeat(4,1fr)",
        "377": "3fr repeat(7,1fr)",
        "121": "1fr 3fr 1fr",
        "1fr3fr": "1fr 3fr",
        "1/2fr1/2fr3fr": "0.5fr 0.5fr 3fr",
      },
      gridTemplateColumns: {
        tweetcol: "1fr 3fr",
      },
    },
  },
  plugins: [],
};
export default config;
