

function success(res, message = 'Success', data = {}) {
  return res.status(CONSTANTS.STATUSCODE.OK).json({
    status: true,
    message,
    data,
  });
}

function created(res, message = 'Resource created', data = {}) {
  return res.status(CONSTANTS.STATUSCODE.CREATED).json({
    status: true,
    message,
    data,
  });
}

function badRequest(res, message = 'Bad Request') {
  return res.status(CONSTANTS.STATUSCODE.BADREQUEST).json({
    status: false,
    message,
  });
}

function unauthorized(res, message = 'Unauthorized') {
  return res.status(CONSTANTS.STATUSCODE.UNAUTHORIZED).json({
    status: false,
    message,
  });
}

function notFound(res, message = 'Not Found') {
  return res.status(CONSTANTS.STATUSCODE.NOTFOUND).json({
    status: false,
    message,
  });
}

function serverError(res, message = 'Internal Server Error') {
  return res.status(CONSTANTS.STATUSCODE.INTERNAL_SERVER_ERROR).json({
    status: false,
    message,
  });
}

module.exports = {
  success,
  created,
  badRequest,
  unauthorized,
  notFound,
  serverError,
};
