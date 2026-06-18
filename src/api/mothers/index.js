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
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Error updating Profile";
  }
};

export const getRecentNotifications = async () => {
  try {
    const { data } = await apiClient.get("/notice");
    return data;
  } catch (error) {
    console.error("Error loading notifications:", error);
    throw error;
  }
};

export const getPregnancyOverview = async () => {
  try {
    const { data } = await apiClient.get("/pregnancyOverview");
    return data;
  } catch (error) {
    console.error("Error loading pregnancy overview:", error);
    throw error;
  }
};

export const getWallet = async () => {
  try {
    const { data } = await apiClient.get("/wallet");
    return data;
  } catch (error) {
    console.error("Error loading wallet:", error);
    throw error;
  }
};

export const getTodaysReminder = async () => {
  try {
    const { data } = await apiClient.get("/todaysReminder");
    return data;
  } catch (error) {
    console.error("Error loading today's reminder:", error);
    throw error;
  }
};
