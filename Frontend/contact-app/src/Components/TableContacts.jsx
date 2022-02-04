import React, { useState } from "react";
import { map } from "lodash";
import * as Icon from "react-bootstrap-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Stack, Table } from "react-bootstrap";
import { toast } from "react-toastify";

export const TableContacts = ({ contacts, handleModal, handleModalDelete }) => {
  const [copy, setCopy] = useState("");
  const copyToClipboard = (contact) => {
    const text = `
    *Nombre*: ${contact.nombre} ${contact.apellido}
    *Email*: ${contact.email}
    *Telefono*: ${contact.telefono}
    *Direccion*: ${contact.direccion}`;
    setCopy(text);
    toast.success("Contacto copiado al portapapeles");
  };
  return (
    <div>
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
                    copyToClipboard={copyToClipboard}
                    copy={copy}
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

const Actions = ({
  handleModal,
  contact,
  handleModalDelete,
  copyToClipboard,
  copy,
}) => {
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
      <CopyToClipboard text={copy}>
        <Button variant="outline-dark" onClick={() => copyToClipboard(contact)}>
          <Icon.Files />
        </Button>
      </CopyToClipboard>
    </Stack>
  );
};
