import bcryptjs from "bcryptjs";

export const hashPassword = async (password: string) => {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcryptjs.compareSync(password, hash);
};
