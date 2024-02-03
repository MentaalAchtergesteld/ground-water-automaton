const config = {
  input: "tsc-out/main.js",
  output: {
    format: "iife",
    file: "dist/script.js",
    interop: "default",
  },
};

export default config;
