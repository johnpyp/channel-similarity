module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  rules: {
    "no-console": 0,
    "class-methods-use-this": 0,
    "no-restricted-syntax": 0,
    "func-names": 0,
    "no-underscore-dangle": 0,
  },
};
