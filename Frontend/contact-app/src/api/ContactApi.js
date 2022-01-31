import { URL_BACK } from "../Utils/constants";

export const getContactsApi = async () => {
  try {
    const url = `${URL_BACK}/api/contacts`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const addContactApi = async (data) => {
  try {
    const url = `${URL_BACK}/api/contacts`;
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

export const updateContactApi = async (id, data) => {
  try {
    const url = `${URL_BACK}/api/contacts/${id}`;
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

export const deleteContactApi = async (id) => {
  try {
    const url = `${URL_BACK}/api/contacts/${id}`;
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

export const getContactApi = async (id) => {
  try {
    const url = `${URL_BACK}/api/tables/${id}`;
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
