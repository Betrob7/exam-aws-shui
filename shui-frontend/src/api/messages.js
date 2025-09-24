import axios from "axios";

const BASE_URL = "https://oatdlmvgcb.execute-api.eu-north-1.amazonaws.com/api/messages";

export const getMessages = async (token) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response.data; // lista med meddelanden
  } catch (error) {
    return error.response?.data?.message || error.message;
  }
};

export const postMessage = async (data, token) => {
  try {
    const response = await axios.post(BASE_URL, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response.data; // det skapade meddelandet
  } catch (error) {
    return error.response?.data?.message || error.message;
  }
};

export const updateMessage = async (id, data, token) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response.data; // det uppdaterade meddelandet
  } catch (error) {
    return error.response?.data?.message || error.message;
  }
};

export const deleteMessage = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response.data; // t.ex. { success: true }
  } catch (error) {
    return error.response?.data?.message || error.message;
  }
};
