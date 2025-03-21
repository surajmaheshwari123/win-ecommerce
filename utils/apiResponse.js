exports.ApiResponse = (res, status, message, code, data, token) => {
    const resModel = {
      meta: {
        Status: status ? status : false,
        Message: message ? message : "",
        code: code ? code : 200,
      },
      data: data ? data : {},
      token: token ? token : "",
    };
    res.json(resModel);
  };
