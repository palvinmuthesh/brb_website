// src/api/vendor.ts
import axios from "./index";

export const getAllVendors = async () => {
  const response = await axios.get("/vendors/allVendors");
  console.log(response, "RRRRRRRRRRRRR")
  return response.data;
};

export const getVendorById = async (id: string) => {
  const response = await axios.get(`/vendors/${id}`);
  return response.data;
};
