import axios from "./index";

// Types
export interface ReportingData {
  totalBookings: number;
  mostBookedTime: string;
}

export const getReportingData = async (): Promise<ReportingData> => {
  const response = await axios.get("/reportings");
  return response.data;
};
