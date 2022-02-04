import React from "react";
import { Button, Stack, Table } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { map } from "lodash";
import { DateTime } from "luxon";

export const TableOrders = ({ ordenes, handleModal, onRefetch }) => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Contacto</th>
            <th>Total</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {map(ordenes, (orden, index) => (
            <tr key={index}>
              <td>{DateTime.fromISO(orden.fecha).toRelativeCalendar()}</td>
              <td>
                {orden.contacto.nombre} {orden.contacto.apellido}
              </td>
              <td>{orden.total} $</td>
              <td>
                {orden.pendiente ? (
                  <Button variant="danger">Pendiente</Button>
                ) : (
                  <Button variant="success" disabled>
                    Entregado
                  </Button>
                )}
              </td>
              <td>{<Actions orden={orden} handleModal={handleModal} />}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const Actions = ({ orden, handleModal }) => {
  return (
    <Stack direction="horizontal" gap={3}>
      <Button variant="outline-primary" onClick={() => handleModal(orden)}>
        <Icon.Eye />
      </Button>
      <Button variant="outline-success">
        <Icon.Whatsapp />
      </Button>
    </Stack>
  );
};
