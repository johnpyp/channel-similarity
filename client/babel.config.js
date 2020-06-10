module.exports = {
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
  ],
  presets: [
    [
      "@babel/env",
      {
        useBuiltIns: "usage",
      },
    ],
  ],
};
