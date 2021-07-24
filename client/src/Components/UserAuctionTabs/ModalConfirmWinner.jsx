import React from "react";
import { Modal, Button, Row, Col, Form, InputGroup } from "react-bootstrap";

const ModalConfirmWinner = ({ show, handleClose, handleSubmit, data }) => {
  const [courierService, setCourierService] = React.useState(false);
  const [pickUp, setPickUp] = React.useState(false);

  const onSubmit = e => {
    e.preventDefault();
    const postData = {
      id_tawaran: data?.bidId,
      jenis_pengiriman: {
        pickUp: pickUp,
        courier: courierService,
      },
    };
    handleSubmit(postData);
  };

  const onConfirm = e => {
    handleSubmit({ id_tawaran: data?.bidId });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Pemenang</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-md-4 pt-4 ">
          <Row className="mb-3">
            <Col sm={4}>Judul Lelang</Col>
            <Col className="text-dark">{data?.auction}</Col>
          </Row>
          <Row className="mb-3">
            <Col sm={4}>Pemenang</Col>
            <Col className="text-dark font-weight-bold">{data?.bidder}</Col>
          </Row>
          <Row className="mb-4">
            <Col sm={4}>Tawaran</Col>
            <Col className="text-success">Rp. {data?.bidValue}</Col>
          </Row>
          <Button variant="primary" onClick={onConfirm}>
            Konfirmasi
          </Button>
          <Form onSubmit={onSubmit}>
            {/* <Form.Group as={Row} controlId="auction" className="my-0">
              <Form.Label column sm="3">
                Lelang
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  readOnly
                  className="bg-transparent"
                  defaultValue={data?.auction}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="bidder" className="my-0">
              <Form.Label column sm="3">
                Pemenang
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  className="bg-transparent"
                  readOnly
                  defaultValue={data?.bidder}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="value_bid">
              <Form.Label column sm="3">
                Tawaran
              </Form.Label>
              <Col sm="9">
                <Form.Control readOnly defaultValue={`Rp. ${data?.bidValue}`} />
              </Col>
            </Form.Group> */}
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default ModalConfirmWinner;
