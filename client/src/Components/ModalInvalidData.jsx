import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const ModalInvalidData = ({ show, title, message, linkTo, linkText }) => {
  return (
    <Modal show={show} className="bg-gray-100" centered>
      <Modal.Header>
        <Modal.Title className="text-dark">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Link to={linkTo} className="btn btn-outline-primary">
          {linkText}
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

ModalInvalidData.defaultProps = {
  show: true,
  title: "Akses ditolak!",
  message: "Silahkan lengkapi data diri anda untuk melajutkan!",
  linkTo: "/akun/info",
  linkText: "Lengkapi data diri",
};

export default ModalInvalidData;
