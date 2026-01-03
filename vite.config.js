import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "@testing-library/jest-dom/vitest";

export default defineConfig({
  base: "/Estate-Agent-Client-side-Web-Application/",
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./src/setupTests.js",
  },
});