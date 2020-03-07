import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import autoExternal from "rollup-plugin-auto-external";
import babel from "rollup-plugin-babel";

const INPUT_NAME = "index.mjs";
const OUTPUT_NAME = "vicis";

export default {
  input: `./src/${INPUT_NAME}`,
  output: [
    {
      file: `./dist/${OUTPUT_NAME}.cjs`,
      format: "cjs",
    },
    {
      file: `./dist/${OUTPUT_NAME}.mjs`,
      format: "es",
    },
  ],
  plugins: [babel({ babelrc: true }), autoExternal(), resolve(), commonjs()],
};
