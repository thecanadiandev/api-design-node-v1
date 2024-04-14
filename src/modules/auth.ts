import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password, hash) => {
  // plain text password vs hashed password in DB 
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  // hash the password , with salt rounds
  return bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
  // a token = id + username + secret
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};


export const protect = (req, res, next) => {
  // we always need a authorization header in the request
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "NOT AUTHORIZED ❌" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "NOT VALID TOKEN ❌" });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
    return;

  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: "SOMETHING ISNT RIGHT WRT TOKEN ❌" });
    return;
  }
};