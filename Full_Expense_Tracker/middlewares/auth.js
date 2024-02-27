const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secretKey = "feiofheofgepegje";
exports.middleParseToken = async (req, res, next) => {
  const token = req.body.token;
  const id = jwt.verify(token, secretKey);
  req.body.userId = id.userId;
  next();
};

exports.middleGetAll = async (req, res, next) => {
  const token = req.headers.authorization;
  const obj = jwt.verify(token, secretKey);
  req.headers.userId = obj.userId;
  next();
};

exports.authenticate = async (req,res,next) =>{
  const token = req.headers.authorization;
  const obj = jwt.verify(token, secretKey);
  req.headers.userId = obj.userId;
  next();

}
