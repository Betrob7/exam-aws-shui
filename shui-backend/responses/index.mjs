export const sendResponse = (code, data) => {
  return {
    statusCode: code,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};
