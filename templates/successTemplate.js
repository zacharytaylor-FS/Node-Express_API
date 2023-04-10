const successTemplate = (res, result, message, status) => {
    return res.status(status).json({
        message: message,
        customer: result,
        status: status
      });
};

module.exports = successTemplate