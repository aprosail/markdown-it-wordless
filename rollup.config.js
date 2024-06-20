import terser from "@rollup/plugin-terser"
import typescript from "@rollup/plugin-typescript"
import {defineConfig} from "rollup"
import dts from "rollup-plugin-dts"

export default defineConfig([
  {
    plugins: [
      typescript({
        compilerOptions: {allowSyntheticDefaultImports: true},
        sourceMap: true,
      }),
      terser(),
    ],
    input: "index.ts",
    output: [
      {file: "index.js", format: "esm", sourcemap: true},
      {file: "index.cjs", format: "cjs", sourcemap: true},
    ],
  },
  {
    plugins: [dts({compilerOptions: {allowSyntheticDefaultImports: true}})],
    input: "index.ts",
    output: {file: "index.d.ts", format: "esm"},
  },
])
