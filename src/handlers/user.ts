import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req, res) => {
  const hash = await hashPassword(req.body.password);

  // create user in db
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hash,
    },
  });

  const token = createJWT(user);
  res.json({ token });
}

export const signin = async (req, res) => {
  // find user in db
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });
  // if the user exists, then compare the passwords 
  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "Invalid username or password ❌" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
