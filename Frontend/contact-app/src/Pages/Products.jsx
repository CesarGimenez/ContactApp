import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { AddEditFormProduct } from "../Components/AddEditFormProduct";
import { CustomModal } from "../Components/CustomModal";
import { ModalDelete } from "../Components/ModalDelete";
import { TableProducts } from "../Components/TableProducts";
import { useProduct } from "../Hook/useProduct";

export const Products = () => {
  const { loading, products, getProducts, deleteProduct } = useProduct();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    getProducts();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);
  const handleModal = (product) => {
    setTitleModal(
      product ? `Actualizar '${product.nombre}'` : `Nuevo producto`
    );
    setContentModal(
      <AddEditFormProduct
        product={product}
        openCloseModal={openCloseModal}
        onRefetch={onRefetch}
      />
    );
    openCloseModal();
  };

  const onDeleteProduct = async (id) => {
    await deleteProduct(id);
    onRefetch();
    openCloseModal();
    toast.success("Producto eliminado");
  };

  const handleModalDelete = (product) => {
    setTitleModal(`Esta seguro de eliminar al producto '${product.nombre}'`);
    setContentModal(
      <Button onClick={() => onDeleteProduct(product._id)}>Si</Button>
    );
    openCloseModal();
  };
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center mb-4 mt-4">
          <Col md={{ span: 6, offset: 3 }}>
            <h1>
              Lista de productos <Icon.Cart />
            </h1>
          </Col>
        </Row>
        <Row className="mt-2 mb-2 justify-content-md-right">
          <Col md={{ offset: 10 }}>
            <Button onClick={() => handleModal()}>
              <Icon.CartPlus /> Agregar nuevo
            </Button>
          </Col>
        </Row>
        {loading ? (
          <Spinner animation="border" variant="success" translate="center" />
        ) : products?.length < 1 ? (
          <Alert variant="primary">
            Aun no tienes productos, registra alguno
          </Alert>
        ) : (
          <TableProducts
            products={products}
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
    </div>
  );
};
