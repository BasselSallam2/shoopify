import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  outDir: "dist",
  format: ["esm"],
  clean: true,
  sourcemap: true,
  target: "es2022",
  splitting: false,
  dts: true,
});
