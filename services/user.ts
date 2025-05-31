import { AuthResponse } from "@/types/user";
import { Post } from "./api";

export type Credentials = {
  name?: string;
  email: string;
  password: string;
};

const login = async (credentials: Credentials): Promise<AuthResponse> => {
  return Post("/auth/login", credentials);
};

const register = async (credentials: Credentials): Promise<AuthResponse> => {
  return Post("/auth/register", credentials);
};

const userService = {
  login,
  register,
};

export { userService };
