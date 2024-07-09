import axiosInstance from ".";
// const apiUrl = import.meta.VITE_APP_BASE_URL;
const apiUrl = "http://localhost:5000";


export const addResult = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${apiUrl}/api/results/addResult`,
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data);

    return error.response.data;
  }
};

export const getAllTry = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${apiUrl}/api/results/getAllTry`,
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data);

    return error.response.data;
  }
};

export const getAllTryByUser = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiUrl}/api/results/getAllTryByUser`
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data);

    return error.response.data;
  }
};
