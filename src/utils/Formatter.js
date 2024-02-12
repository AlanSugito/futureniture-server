class Formatter {
  static formatRequestLog(req, res, message) {
    return `${res.statusCode} ${req.method} ${req.path} ${message}`;
  }
}

export default Formatter;
