import autoExternal from "rollup-plugin-auto-external";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const INPUT_NAME = "index.mjs";
const OUTPUT_NAME = "vicis";
const UMD_NAME = "vicis";

export default {
  input: `./src/${INPUT_NAME}`,
  output: [
    {
      file: `./dist/${OUTPUT_NAME}.js`,
      format: "umd",
      name: UMD_NAME,
      sourcemap: true,
    },
  ],
  plugins: [
    babel({ babelrc: true }),
    autoExternal(),
    resolve(),
    commonjs(),
    terser({
      output: {
        comments: false,
      },
      sourcemap: true,
      warnings: true,
      keep_classnames: false,
      keep_fnames: false,
    }),
  ],
};