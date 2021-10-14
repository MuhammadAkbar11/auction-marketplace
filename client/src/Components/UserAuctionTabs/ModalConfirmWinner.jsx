import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { XCircle } from "phosphor-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ModalConfirmWinner = ({ show, handleClose, handleSubmit, data }) => {
  const [courierService, setCourierService] = React.useState(false);
  const [pickUp, setPickUp] = React.useState(false);

  const { details } = useSelector(state => state.userDetails);

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
          {details.akun_bank?.length === 0 ? (
            <>
              <div className="w-100 d-flex justify-content-center text-danger flex-column align-items-center ">
                <XCircle size={60} />
                <h3 className="text-spacing-1 mt-2 font-weight-normal text-danger text-capitalize">
                  Tidak dapat melakukan Konfirmasi
                </h3>
              </div>
              <div className="mt-3">
                <p className="text-gray-600">
                  Anda belum menambahkan akun rekening anda{" "}
                </p>
              </div>
              <div className="w-100 mt-3 d-flex justify-content-center">
                <Link
                  className="btn btn-danger mx-auto"
                  to="/akun/info/#bank-accounts"
                >
                  Tambah akun rekening
                </Link>
              </div>
            </>
          ) : (
            <>
              {" "}
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
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalConfirmWinner;
