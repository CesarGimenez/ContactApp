import React from "react";
import { useState } from "react";
import {
  getOrderApi,
  getOrdersApi,
  addOrderApi,
  updateOrderStatusApi,
} from "../api/OrderApi";

export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState(null);
  const [order, setOrder] = useState(null);

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrdersApi();
      setLoading(false);
      setOrders(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addOrder = async (data) => {
    try {
      setLoading(true);
      await addOrderApi(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateOrderStatus = async (id, data) => {
    try {
      setLoading(true);
      await updateOrderStatusApi(id, data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getOrder = async (id) => {
    try {
      setLoading(true);
      const response = await getOrderApi(id);
      setLoading(false);
      setOrder(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    orders,
    order,
    getOrders,
    addOrder,
    updateOrderStatus,
    getOrder,
  };
};
