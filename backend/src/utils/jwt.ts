import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "firehawk-secret";

export const generateToken = (user: {
  id: string;
  role: string;
}) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};
