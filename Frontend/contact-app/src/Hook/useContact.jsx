import React from "react";
import { useState } from "react";
import {
  addContactApi,
  deleteContactApi,
  getContactApi,
  getContactsApi,
  updateContactApi,
} from "../api/ContactApi";

export const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contacts, setContacts] = useState(null);
  const [contact, setContact] = useState(null);

  const getContacts = async () => {
    try {
      setLoading(true);
      const response = await getContactsApi();
      setLoading(false);
      setContacts(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addContact = async (data) => {
    try {
      setLoading(true);
      await addContactApi(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateContact = async (id, data) => {
    try {
      setLoading(true);
      await updateContactApi(id, data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteContact = async (id) => {
    try {
      setLoading(true);
      await deleteContactApi(id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getContact = async (id) => {
    try {
      setLoading(true);
      const response = await getContactApi(id);
      setLoading(false);
      setContact(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    contacts,
    contact,
    getContacts,
    addContact,
    updateContact,
    deleteContact,
    getContact,
  };
};
