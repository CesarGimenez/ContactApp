import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Stack,
  Spinner,
  FormControl,
  Alert,
} from "react-bootstrap";
import { toast } from "react-toastify";
import * as Icon from "react-bootstrap-icons";
import { useContact } from "../Hook/useContact";
import { AddEditForm } from "../Components/AddEditForm";
import { TableContacts } from "../Components/TableContacts";
import { CustomModal } from "../Components/CustomModal";
import { ModalDelete } from "../Components/ModalDelete";

export const Contacts = () => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [search, setSearch] = useState("");

  const { loading, contacts, getContacts, deleteContact } = useContact();

  useEffect(() => {
    getContacts();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);
  const handleModal = (contact) => {
    setTitleModal(
      contact ? `Actualizar '${contact.nombre}'` : `Nuevo contacto`
    );
    setContentModal(
      <AddEditForm
        contact={contact}
        onRefetch={onRefetch}
        openCloseModal={openCloseModal}
      />
    );
    openCloseModal();
  };

  const onDeleteContact = async (id) => {
    await deleteContact(id);
    onRefetch();
    openCloseModal();
    toast.success("Contacto eliminado");
  };

  const handleModalDelete = (contact) => {
    setTitleModal(`Esta seguro de eliminar al contacto '${contact.nombre}'`);
    setContentModal(
      <Button onClick={() => onDeleteContact(contact._id)}>Si</Button>
    );
    openCloseModal();
  };

  const contactsFiltered = contacts?.filter((contact) => {
    if (search === "") return contact;
    else if (
      contact.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      contact.apellido?.toLowerCase().includes(search.toLowerCase())
    )
      return contact;
  });
  return (
    <Container>
      <Row className="justify-content-md-center mb-4 mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <h1>
            Lista de contactos <Icon.Person />
          </h1>
        </Col>
      </Row>
      <Stack className="mt-2 mb-2" gap="3" direction="horizontal">
        <FormControl
          placeholder="Buscar contactos"
          onChange={(e) => setSearch(e.target.value)}
        ></FormControl>
        <Button onClick={() => handleModal()}>
          <Icon.PersonPlus /> Agregar nuevo
        </Button>
      </Stack>
      {loading ? (
        <Spinner animation="border" variant="success" translate="center" />
      ) : contacts?.length < 1 ? (
        <Alert variant="primary">
          Aun no tienes contactos, registra alguno
        </Alert>
      ) : (
        <TableContacts
          contacts={contactsFiltered}
          handleModal={handleModal}
          handleModalDelete={handleModalDelete}
        />
      )}

      <CustomModal
        show={showModal}
        onHide={openCloseModal}
        title={titleModal}
        content={contentModal}
      ></CustomModal>
      <ModalDelete
        show={showModal}
        onHide={openCloseModal}
        title={titleModal}
        content={contentModal}
      ></ModalDelete>
    </Container>
  );
};
