import argh from "argh";
import autoExternal from "rollup-plugin-auto-external";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import rollupPluginTerser from "rollup-plugin-terser";

const { argv } = argh;

const INPUT_NAME = "index.mjs";
const OUTPUT_NAME = "vicis";
const UMD_NAME = "vicis";

const output = {
  globals: {
    "es-aggregate-error": "AggregateError",
  },
  sourcemap: true,
};

const plugins = [];

if (argv["config-dev"] !== true) {
  plugins.push(
    rollupPluginTerser.terser({
      keep_classnames: true,
      keep_fnames: true,
      output: {
        comments: false,
      },
      sourcemap: true,
      warnings: true,
    }),
  );
} else {
  // eslint-disable-next-line no-console
  console.warn("\x1B[31m ⚠ Development Build ⚠️");
}

export default {
  input: `./src/${INPUT_NAME}`,
  output: [
    {
      ...output,
      file: `./dist/${OUTPUT_NAME}.cjs`,
      format: "cjs",
    },
    {
      ...output,
      file: `./dist/${OUTPUT_NAME}.mjs`,
      format: "es",
    },
    {
      ...output,
      file: `./dist/${OUTPUT_NAME}.js`,
      format: "umd",
      name: UMD_NAME,
    },
  ],
  plugins: [babel({ babelrc: true }), autoExternal(), resolve(), commonjs(), ...plugins],
  external: ["es-aggregate-error"],
};
