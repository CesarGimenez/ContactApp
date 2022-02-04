import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { TableOrders } from "../Components/TableOrders";
import { useOrder } from "../Hook/useOrder";
import { size } from "lodash";
import { CustomModal } from "../Components/CustomModal";
import { DetailsOrder } from "../Components/DetailsOrder";
import { AddOrder } from "../Components/AddOrder";

export const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const { loading, orders, getOrders } = useOrder();

  useEffect(() => {
    getOrders();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);
  const handleModal = (order) => {
    setTitleModal(order ? `Detalle de la orden` : `Nueva orden`);
    setContentModal(
      order ? (
        <DetailsOrder orden={order} />
      ) : (
        <AddOrder onRefetch={onRefetch} openCloseModal={openCloseModal} />
      )
    );
    openCloseModal();
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center mb-4 mt-4">
          <Col md={{ span: 6, offset: 3 }}>
            <h1>
              Lista de ordenes <Icon.Cart />
            </h1>
          </Col>
        </Row>
        <Row className="mt-2 mb-2 justify-content-md-right">
          <Col md={{ offset: 10 }}>
            <Button onClick={() => handleModal()}>
              <Icon.CartPlus /> Registrar nueva
            </Button>
          </Col>
        </Row>
        {loading ? (
          <Spinner animation="border" variant="success" translate="center" />
        ) : size(orders?.ordenes) < 1 ? (
          <Alert variant="primary">No tienes ordenes pendientes</Alert>
        ) : (
          <TableOrders
            ordenes={orders.ordenes}
            handleModal={handleModal}
            onRefetch={onRefetch}
          />
        )}
      </Container>
      <CustomModal
        show={showModal}
        onHide={openCloseModal}
        title={titleModal}
        content={contentModal}
      ></CustomModal>
    </div>
  );
};
