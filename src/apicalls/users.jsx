import axiosInstance from ".";
// const apiUrl = import.meta.VITE_APP_BASE_URL;
const apiUrl = "http://localhost:5000";

export const registerUser = async (payload) => {
  try {
    console.log(payload);
    const response = await axiosInstance.post(
      `${apiUrl}/api/users/register`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${apiUrl}/api/users/login`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.post(
      `${apiUrl}/api/users/get-user-info`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
