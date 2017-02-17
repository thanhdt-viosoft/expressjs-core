const mailService = require('./mail.service');

var main = async () => {   
    console.log("Start mail sending service");
    mailService.schedule();
};

main();