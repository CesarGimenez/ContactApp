import React, { useEffect } from "react";
import { Col, Form, Row, Spinner, Table } from "react-bootstrap";
import { map } from "lodash";
import { DateTime } from "luxon";
import { useOrder } from "../Hook/useOrder";

export const DetailsOrder = ({ orden }) => {
  const { getOrder, loading, order } = useOrder();

  useEffect(() => {
    getOrder(orden._id);
  }, []);
  console.log(order);
  return (
    <div>
      {loading ? (
        <Spinner animation="border" variant="success" translate="center" />
      ) : (
        <div>
          <Form>
            <Form.Group>
              <h6>Datos de contacto</h6>
              <Form.Control
                value={`${order?.data.venta.contacto.nombre} ${order?.data.venta.contacto.apellido}`}
                readOnly
                className="mb-1"
              ></Form.Control>
              <Form.Control
                value={order?.data.venta.contacto.email}
                readOnly
                className="mb-1"
              ></Form.Control>
              <Row>
                <Col>
                  <Form.Control
                    value={order?.data.venta.contacto.telefono}
                    readOnly
                    className="mb-3"
                  ></Form.Control>
                </Col>
                <Col>
                  <Form.Control
                    value={order?.data.venta.contacto.direccion}
                    readOnly
                    className="mb-3"
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <h6>Datos de la venta</h6>
            <Row>
              <Col>
                <Form.Label>
                  <b>Fecha:</b>{" "}
                  {DateTime.fromISO(order?.data.venta.fecha).toFormat(
                    "dd-MM-yyyy"
                  )}
                </Form.Label>
              </Col>
              <Col>
                <Form.Label>
                  <b>Estado:</b>{" "}
                  {order?.data.venta.pendiente ? "pendiente" : "Entregado"}
                </Form.Label>
              </Col>
            </Row>
          </Form>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Costo</th>
              </tr>
            </thead>
            <tbody>
              {map(order?.data.detalles, (detalle, index) => (
                <tr key={index}>
                  <td>{detalle.producto.nombre}</td>
                  <td>{detalle.cantidad}</td>
                  <td>{detalle.cantidad * detalle.producto.precio} $</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div style={{ textAlign: "center" }}>
            <b>Total a pagar: {order?.data.venta.total} $</b>
          </div>
        </div>
      )}
    </div>
  );
};
