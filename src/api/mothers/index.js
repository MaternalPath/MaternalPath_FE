import apiClient from "../client";

export const getTrimesterInformation = async () => {
  try {
    const { data } = await apiClient.get("/getTrimester");
    console.log("get Trimester:", data);
    return data;
  } catch (error) {
    console.error("Error loading trimester information:", error);
    throw error;
  }
};
