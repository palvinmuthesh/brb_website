import axios from "./index";

// Types
export interface Service {
  _id: string;
  city: string;
}

export const getAllLocations = async () => {
  const response = await axios.get("/locations");
  return response.data;
};