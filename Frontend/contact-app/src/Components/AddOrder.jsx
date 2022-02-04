import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { map, size } from "lodash";
import { useContact } from "../Hook/useContact";
import { useProduct } from "../Hook/useProduct";
import { useOrder } from "../Hook/useOrder";
import { toast } from "react-toastify";

export const AddOrder = ({ onRefetch, openCloseModal }) => {
  const { getContacts, contacts } = useContact();
  const { getProducts, products, getProduct } = useProduct();
  const { addOrder } = useOrder();
  const [counter, setCounter] = useState(null);
  const [productSelected, setProductSelected] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [tableProducts, setTableProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getContacts();
    getProducts();
  }, []);

  useEffect(() => {
    loadTable();
  }, [reload]);

  const onReload = () => setReload((prev) => !prev);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      await addOrder(formValue);
      onRefetch();
      openCloseModal();
      toast.success("Orden creada exitosamente");
    },
  });

  const addProductList = async () => {
    const detalle = {
      producto: productSelected,
      cantidad: counter,
    };

    setDetalles([...detalles, detalle]);
    onReload();
  };

  const loadTable = async () => {
    formik.setFieldValue("detalles", detalles);

    const arrayTableProduct = [];
    let Total = 0;
    for await (const detal of detalles) {
      const response = await getProduct(detal.producto);
      Total += detal.cantidad * response.precio;
      arrayTableProduct.push(response);
    }
    formik.setFieldValue("total", Total);
    setTableProducts(arrayTableProduct);
  };
  console.log(detalles);
  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Select
          aria-label="Selecciona un contacto"
          required
          onChange={(e) => formik.setFieldValue("contacto", e.target.value)}
        >
          <option disabled selected>
            Selecciona un contacto
          </option>
          {map(contacts, (contact, index) => (
            <option key={index} value={contact._id}>
              {contact.nombre}
            </option>
          ))}
        </Form.Select>
        <Row className="mt-3">
          <Col>
            <Form.Select onChange={(e) => setProductSelected(e.target.value)}>
              <option disabled selected>
                Selecciona un producto
              </option>
              {map(products, (product, index) => (
                <option key={index} value={product._id}>
                  {product.nombre}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              type="number"
              min={1}
              step={1}
              onChange={(e) => setCounter(e.target.value)}
            ></Form.Control>
          </Col>
          <Col>
            <Button type="button" onClick={() => addProductList()}>
              <Icon.Plus />
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Costo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {map(tableProducts, (product, index) => (
              <tr key={index}>
                <td>{product?.nombre}</td>
                <td>{detalles[index].cantidad}</td>
                <td>{detalles[index].cantidad * product?.precio}</td>
                <td>
                  <Icon.Trash onClick={() => console.log("Hola")} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div style={{ textAlign: "center" }}>
          <b>Total a pagar: {formik.values.total} $</b>
        </div>
        {size(detalles) < 1 ? "" : <Button type="submit">Crear orden</Button>}
      </Form>
    </div>
  );
};

const initialValues = () => {
  return {
    contacto: "",
    total: "",
    detalles: [],
  };
};

const newValidationSchema = () => {
  return {
    contacto: Yup.string().required(),
    detalles: Yup.array().required(),
  };
};
