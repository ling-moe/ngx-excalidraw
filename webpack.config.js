module.exports = {
  "resolve": {
    "alias": {
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",     // 必须放在 test-utils 下面
      "react/jsx-runtime": "preact/jsx-runtime"
    },
  }
};
