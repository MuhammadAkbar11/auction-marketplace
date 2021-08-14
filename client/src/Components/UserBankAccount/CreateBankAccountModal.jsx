import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const CreateBankAccountModal = ({ loading, show, handleClose, formik }) => {
  const bank = ["Mandiri", "Mandiri Syariah", "BCA", "BRI", "BNI", "BTPN"];

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Akun Bank</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="no_rek">
              <Form.Label>Nomor Rekening</Form.Label>
              <Form.Control
                className=" bg-transparent border "
                onChange={formik.handleChange}
                value={formik.values.no_rek}
                isInvalid={formik.errors.no_rek ? true : false}
                placeholder="Masukan nomor rekening anda"
              />
              {formik.errors.no_rek ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.no_rek}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="nama_rek">
              <Form.Label>Nama Rekening</Form.Label>
              <Form.Control
                className=" bg-transparent border "
                onChange={formik.handleChange}
                value={formik.values.nama_rek}
                isInvalid={formik.errors.nama_rek ? true : false}
                placeholder="Masukan nomor rekening anda"
              />
              {formik.errors.nama_rek ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.nama_rek}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="nama_bank">
              <Form.Label>Kecamatan</Form.Label>
              <Form.Control
                className="bg-transparent border"
                as="select"
                onChange={formik.handleChange}
                value={formik.values.nama_bank}
                isInvalid={formik.errors.nama_bank ? true : false}
              >
                <option value=""> Pilih bank </option>
                {bank.map((item, i) => {
                  const key = i;
                  return (
                    <option key={key} value={item}>
                      {item}
                    </option>
                  );
                })}
              </Form.Control>
              {formik.errors.nama_bank ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.nama_bank}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <div className="mt-3">
              {" "}
              <Button disabled={loading} variant="primary" type="submit">
                {loading ? "Loading..." : "Tambah Akun"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateBankAccountModal;
