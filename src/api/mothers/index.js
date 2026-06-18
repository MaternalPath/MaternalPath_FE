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

export const getMotherProfile = async () => {
    try {
        const response = await apiClient.get("/mother/get-mother")
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
        throw error.response.data.message || "Error getting Profile"
    }
}

export const updateMotherProfile = async (id, profileData) => {
    try {
        const response = await apiClient.post(
            `/mother/update-profile/${id}`,
            profileData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
        throw error.response.data.message || "Error updating Profile"
    }
}