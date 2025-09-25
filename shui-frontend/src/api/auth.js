import axios from "axios";

export const loginApi = async (data) => {
  try {
    const response = await axios.post("https://oatdlmvgcb.execute-api.eu-north-1.amazonaws.com/api/auth/login", data);
    return response.data; // alltid objekt { message, token, ... }
  } catch (error) {
    return {
      message: error.response?.data?.message || error.message,
    };
  }
};

export const registerApi = async (data) => {
  try {
    const response = await axios.post("https://oatdlmvgcb.execute-api.eu-north-1.amazonaws.com/api/auth/register", data);
    return response.data; // alltid objekt
  } catch (error) {
    return {
      message: error.response?.data?.message || error.message,
    };
  }
};
