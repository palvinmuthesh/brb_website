import axios from "./index";

// Types
export interface Service {
  _id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
}

export const getServicesByVendorId = async (vendorId: string): Promise<Service[]> => {
  const response = await axios.get(`/services?vendorId=${vendorId}`);
  return response.data;
};

export const getAllServices = async () => {
  const response = await axios.get("/services");
  return response.data;
};