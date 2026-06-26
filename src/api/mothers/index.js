import apiClient from "../client";

export const getTrimesterInformation = async () => {
  try {
    const { data } = await apiClient.get("/getTrimester");

    return data;
  } catch (error) {
    console.error("Error loading trimester information:", error);
    throw error;
  }
};

export const getMotherProfile = async () => {
  try {
    const response = await apiClient.get("/mother/get-mother");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data.message || "Error getting Profile";
  }
};

export const getDashboardOverview = async () => {
  try {
    const response = await apiClient.get("/dashboard");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data.message || "Error getting Profile";
  }
};

export const getMotherHospital = async () => {
  try {
    const response = await apiClient.get("/mother/getHospitals");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data.message || "Error getting Profile";
  }
};

export const updateMotherProfile = async (id, profileData) => {
  try {
    const response = await apiClient.put(
      `/mother/update-profile`,
      profileData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Error updating Profile";
  }
};

export const getTodaysReminder = async () => {
  try {
    const { data } = await apiClient.get("/mothers/notifications");
    return data;
  } catch (error) {
    console.error("Error loading today's reminder:", error);
    throw error;
  }
};

export const getPregnancyTracker = async () => {
  try {
    const { data } = await apiClient.get("/tracker/pregnancyTracker");
    return data;
  } catch (error) {
    console.error("Error loading weekly care reminder:", error);
    throw error;
  }
};

export const getEmergencyWalletInfo = async () => {
  try {
    const { data } = await apiClient.get("/emergencyWallet");
    return data;
  } catch (error) {
    console.error("Error loading weekly care reminder:", error);
    throw error;
  }
};

export const getWeeklyGuidance = async () => {
  try {
    const { data } = await apiClient.get("/guide/weekly");
    return data;
  } catch (error) {
    console.error("Error loading weekly guidance:", error);
    throw error;
  }
};

export const fundWallet = async (payload) => {
  try {
    const { data } = await apiClient.post("/payment/initiate", payload);
    return data;
  } catch (error) {
    console.error("Error funding wallet:", error);
    throw error.response?.data?.message || "Error funding wallet";
  }
};

export const getMotherNotifications = async () => {
  try {
    const { data } = await apiClient.get("/mothers/notifications");
    return data;
  } catch (error) {
    console.error("Error loading weekly care reminder:", error);
    throw error;
  }
};

export const getPaymentHistory = async () => {
  try {
    const { data } = await apiClient.get("/payment/history");
    return data;
  } catch (error) {
    console.error("Error loading payment history:", error);
    throw error.response?.data?.message || "Error loading payment history";
  }
};
