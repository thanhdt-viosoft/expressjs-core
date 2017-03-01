module.exports = {
  apps : [{
    name        : "mcro-theme",
    script      : "./index.js",
    watch       : false,
    env: {
      "NODE_ENV": "production"
    }
  }]
}