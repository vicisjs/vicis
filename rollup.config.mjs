/*  eslint-env node */
import rollupConfigPkg from "@r37r0m0d3l/rollup-config-pkg";

import { default as core } from "@babel/core";
import typescript from "rollup-plugin-typescript2";

const config = rollupConfigPkg("index", "vicis", {
  input: "./src/index.ts",
  external: ["es-aggregate-error"],
});

config.output.forEach((output) => {
  Object.assign(output, {
    globals: {
      "es-aggregate-error": "AggregateError",
    },
  });
});

config.plugins.push(
  typescript({
    rollupCommonJSResolveHack: false,
    clean: true,
  }),
);

config.plugins[0].extensions = [...core.DEFAULT_EXTENSIONS, ".ts", ".tsx"];

config.context = "null";
config.moduleContext = "null";

export default config;
