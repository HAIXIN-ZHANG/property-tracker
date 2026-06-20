import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  jsxFramework: "react",
  include: ["./src/**/*.{ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  theme: {
    extend: {
      tokens: {
        colors: {
          canvas: { value: "#f5f6f3" },
          ink: { value: "#171b1f" },
          muted: { value: "#68727a" },
          line: { value: "#dfe4e2" },
          panel: { value: "#ffffff" },
          eucalyptus: { value: "#11614c" },
          ocean: { value: "#2662d9" },
          amber: { value: "#b7791f" },
          rose: { value: "#b42318" }
        },
        radii: {
          panel: { value: "8px" },
          control: { value: "6px" }
        },
        shadows: {
          soft: { value: "0 18px 52px rgba(23, 27, 31, 0.08)" }
        }
      }
    }
  }
});
