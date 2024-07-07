import axiosInstance from ".";
const apiUrl = process.env.REACT_APP_BASE_URL;

export const addQuiz = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${apiUrl}/api/quizs/addQuiz`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllQuizs = async () => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/api/quizs/getAllQuizs`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getQuizById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${apiUrl}/api/quizs/getQuizById/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const editQuiz = async (payload, id) => {
  try {
    const response = await axiosInstance.put(
      `${apiUrl}/api/quizs//editQuiz/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteQuiz = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `${apiUrl}/api/quizs/deleteQuiz/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addQuestionToQuiz = async (payload, id) => {
  try {
    const response = await axiosInstance.post(
      `${apiUrl}/api/quizs/addQuestionToQuiz/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const editQuestionInQuiz = async (payload, id) => {
  try {
    const response = await axiosInstance.put(
      `${apiUrl}/api/quizs/editQuestionInQuiz/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteQuestionFromQuiz = async (id, payload) => {
  try {
    const response = await axiosInstance.delete(
      `${apiUrl}/api/quizs/deleteQuestionFromQuiz/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};