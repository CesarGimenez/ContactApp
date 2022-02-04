import { useState } from "react";
import {
  addProductApi,
  getProductApi,
  getProductsApi,
  updateProductApi,
  deleteProductApi,
} from "../api/ProductApi";

export const useProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductsApi();
      setLoading(false);
      setProducts(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addProduct = async (data) => {
    try {
      setLoading(true);
      await addProductApi(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateProduct = async (id, data) => {
    try {
      setLoading(true);
      await updateProductApi(id, data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await deleteProductApi(id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getProduct = async (id) => {
    try {
      setLoading(true);
      const response = await getProductApi(id);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    products,
    product,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
  };
};
