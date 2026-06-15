import apiClient from "../client";

export const getVerificationHistoryStats = async () => {
  const { data } = await apiClient.get("/hospital/verification-history");
  console.log("Verification history stats:", data);
  return data;
};
