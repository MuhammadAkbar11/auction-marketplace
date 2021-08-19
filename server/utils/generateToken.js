import jwt from "jsonwebtoken";

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

export const generateAdminToken = id => {
  return jwt.sign({ id_admin: id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export default generateToken;
