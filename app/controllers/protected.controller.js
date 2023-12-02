// app/controllers/protected.controller.js
exports.protectedRouteHandler = (req, res) => {
    res.json({ message: "This is a protected route. Access granted." });
  };
  