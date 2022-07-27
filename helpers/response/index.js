const formatResponse = (statusCode, body) => ({
    statusCode,
    body
});
  
exports.success = (data) =>
    formatResponse(200, data);
  
exports.badRequest = (data) =>
    formatResponse(400, data);
  
exports.internalServerError = (data = {}) =>
    formatResponse(500, data);

exports.unAuthorized = data => formatResponse(401, data); 