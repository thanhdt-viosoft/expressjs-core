module.exports = {
  apps : [{
    name        : "mcro-log",
    script      : "./index.js",
    watch       : false,
    node_args: "--harmony-async-await",
    env: {
      "NODE_ENV": "production"
    }
  }]
}