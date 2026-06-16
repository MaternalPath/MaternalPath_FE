import apiClient from "../client";

export const getVerificationHistoryStats = async () => {
  const { data } = await apiClient.get("/hospital/verification-history");
  console.log("Verification history stats:", data);
  return data;
};

export const getHospitalDashboardStats = async () => {
  const { data } = await apiClient.get("/hospital/dashboard");
  console.log("Hospital dashboard stats:", data);
  return data;
};

export const searchPatient = async (searchTerm) => {
  const { data } = await apiClient.get("/hospital/search-patient", {
    params: { search: searchTerm },
  });
  console.log("Search patient response:", data);
  return data;
};

export const getVerificationRequests = async () => {
  const { data } = await apiClient.get("/hospital/verification-requests");
  console.log("Verification requests:", data);
  return data;
};