import React from "react";
import { Button, Stack, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { map } from "lodash";
import * as Icon from "react-bootstrap-icons";

export const TableProducts = ({ products, handleModal, handleModalDelete }) => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {map(products, (product, index) => (
            <tr key={index}>
              <td>{product.nombre}</td>
              <td>{product.descripcion}</td>
              <td>{product.precio}</td>
              <td>{product.stock}</td>
              <td>
                {
                  <Actions
                    product={product}
                    handleModal={handleModal}
                    handleModalDelete={handleModalDelete}
                  />
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const Actions = ({ product, handleModal, handleModalDelete }) => {
  return (
    <Stack direction="horizontal" gap={3}>
      <Button variant="outline-success" onClick={() => handleModal(product)}>
        <Icon.Pencil />
      </Button>
      <Button
        variant="outline-danger"
        onClick={() => handleModalDelete(product)}
      >
        <Icon.Trash />
      </Button>
    </Stack>
  );
};
