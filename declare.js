Error.BAD_REQUEST = 400;
Error.NOT_FOUND = 404;
Error.EXPIRED = 440;
Error.AUTHEN = 401;
Error.AUTHORIZ = 403;
Error.INTERNAL = 500;
Error.CONDITION = 412;
Error.LOCKED = 423;
Error.create = (code, msg) => {
    let err = new Error(msg);
    err.status = code;
    return err;
};