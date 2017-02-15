module.exports = {
  sayHello(name){
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve(name);
      }, 1000);
    });    
  }
}