import { URL_BACK } from "../Utils/constants";

export const getProductsApi = async () => {
  try {
    const url = `${URL_BACK}/api/products`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const addProductApi = async (data) => {
  try {
    const url = `${URL_BACK}/api/products`;
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

export const updateProductApi = async (id, data) => {
  try {
    const url = `${URL_BACK}/api/products/${id}`;
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

export const deleteProductApi = async (id) => {
  try {
    const url = `${URL_BACK}/api/products/${id}`;
    const params = {
      method: "DELETE",
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getProductApi = async (id) => {
  try {
    const url = `${URL_BACK}/api/products/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
