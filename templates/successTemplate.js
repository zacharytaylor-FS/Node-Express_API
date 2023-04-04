const successTemplate = (res, result, message, status) => {
    return res.status(status).json({
        message: messages.customer_save,
        customer: result,
        status: status
      });
};

module.exports = successTemplate