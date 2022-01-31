import React from "react";
import { map } from "lodash";
import * as Icon from "react-bootstrap-icons";
import { Button, Stack, Table } from "react-bootstrap";

export const TableContacts = ({ contacts, handleModal, handleModalDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Telefono</th>
          <th>Direccion</th>
          <th>Activo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {map(contacts, (contact, index) => (
          <tr key={index}>
            <td>{contact.nombre + " " + contact?.apellido}</td>
            <td>{contact.email}</td>
            <td>{contact.telefono}</td>
            <td>{contact.direccion}</td>
            <td>{contact?.active ? <Icon.Check /> : <Icon.XCircle />}</td>
            <td>
              {
                <Actions
                  handleModal={handleModal}
                  contact={contact}
                  handleModalDelete={handleModalDelete}
                />
              }
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const Actions = ({ handleModal, contact, handleModalDelete }) => {
  return (
    <Stack direction="horizontal" gap={3}>
      <Button variant="outline-success" onClick={() => handleModal(contact)}>
        <Icon.Pencil />
      </Button>
      <Button
        variant="outline-danger"
        onClick={() => handleModalDelete(contact)}
      >
        <Icon.Trash />
      </Button>
    </Stack>
  );
};
