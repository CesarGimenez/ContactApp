import { URL_BACK } from "../Utils/constants";

export const getOrdersApi = async () => {
  try {
    const url = `${URL_BACK}/api/orders`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getOrderApi = async (id) => {
  try {
    const url = `${URL_BACK}/api/orders/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const addOrderApi = async (data) => {
  try {
    const url = `${URL_BACK}/api/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatusApi = async (id, data) => {
  try {
    const url = `${URL_BACK}/api/orders/${id}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
