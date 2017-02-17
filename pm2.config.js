module.exports = {
  apps : [{
    name        : "mcro-oauth",
    script      : "./index.js",
    watch       : false,
    node_args: "--harmony-async-await",
    env: {
      "NODE_ENV": "production"
    }
  }]
}