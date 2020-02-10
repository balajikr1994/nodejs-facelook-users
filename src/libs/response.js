//UNIQUE RESPONSE CONFIGURATION

module.exports = (res, status, msg, output, appErrorCode) => {
  output = output ? output : {};
  let meta = {};
  meta.status = status;
  if (appErrorCode) {
    meta.error = appErrorCode;
  }
  meta.msg = msg;
  res.statusCode = status;
  res.send({
    meta: meta,
    response: output
  });
};
