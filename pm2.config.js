module.exports = {
  apps : [{
    name        : "expressjs-core",
    script      : "./index.js",
    watch       : false,
    node_args: "--harmony-async-await",
    env: {
      "NODE_ENV": "production"
    }
  }]
}