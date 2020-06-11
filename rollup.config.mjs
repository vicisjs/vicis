/*  eslint-env node */
import rollupConfigPkg from "@r37r0m0d3l/rollup-config-pkg";

const config = rollupConfigPkg("vicis", "vicis", {
  external: ["es-aggregate-error"],
});

config.output.forEach((output) => {
  Object.assign(output, {
    globals: {
      "es-aggregate-error": "AggregateError",
    },
  });
});

export default config;
