import axios from "./index";

// Types
export interface LoginDto {
  email: string;
  password: string;
}

export const login = async (data: LoginDto) => {
  const response = await axios.post("/auth/login", data);
  return response.data;
};
