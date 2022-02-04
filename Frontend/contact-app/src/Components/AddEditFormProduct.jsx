import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
import { useProduct } from "../Hook/useProduct";

export const AddEditFormProduct = ({ product, openCloseModal, onRefetch }) => {
  const { addProduct, updateProduct } = useProduct();
  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: Yup.object(newValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (product) {
        await updateProduct(product._id, formValue);
        onRefetch();
        openCloseModal();
        toast.success("Producto actualizado");
      } else {
        await addProduct(formValue);
        onRefetch();
        openCloseModal();
        toast.success("Producto creado exitosamente");
      }
    },
  });
  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escriba el nombre"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
          />
          {formik.errors.nombre && (
            <span className="text-danger">{formik.errors.nombre}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Escriba breve descripcion"
            name="descripcion"
            value={formik.values.descripcion}
            onChange={formik.handleChange}
          />
          {formik.errors.descripcion && (
            <span className="text-danger">{formik.errors.descripcion}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Escriba el precio"
            min={1}
            max={100}
            step={0.5}
            name="precio"
            value={formik.values.precio}
            onChange={formik.handleChange}
          />
          {formik.errors.precio && (
            <span className="text-danger">{formik.errors.precio}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Cantidad de producto</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Escriba la cantidad"
            name="stock"
            min={0}
            value={formik.values.stock}
            onChange={formik.handleChange}
          />
          {formik.errors.stock && (
            <span className="text-danger">{formik.errors.stock}</span>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          {product ? `Actualizar producto` : `Crear producto`}
        </Button>
      </Form>
    </div>
  );
};

const initialValues = (product) => {
  return {
    nombre: product?.nombre || "",
    descripcion: product?.descripcion || "",
    precio: product?.precio || 0,
    stock: product?.stock || 0,
  };
};

const newValidationSchema = () => {
  return {
    nombre: Yup.string().required("El nombre es obligatorio"),
    descripcion: Yup.string().required("La descripcion es obligatoria"),
    precio: Yup.number().required("El precio es obligatorio"),
    stock: Yup.number().required("El precio es obligatorio"),
  };
};
