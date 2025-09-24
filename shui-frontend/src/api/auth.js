import axios from "axios";

export const loginApi = async (data) => {
  try {
    const response = await axios.post("https://oatdlmvgcb.execute-api.eu-north-1.amazonaws.com/api/auth/login", data);

    if (response.status === 200) {
      return response.data; // oftast vill man bara returnera data, inte hela response
    } else {
      return response.data.message;
    }
  } catch (error) {
    // axios error kan ha response eller bara message
    return error.response?.data?.message || error.message;
  }
};

export const registerApi = async (data) => {
  try {
    const response = await axios.post("https://oatdlmvgcb.execute-api.eu-north-1.amazonaws.com/api/auth/register", data);

    if (response.status === 201) {
      return response.data;
    } else {
      return response.data.message;
    }
  } catch (error) {
    return error.response?.data?.message || error.message;
  }
};
