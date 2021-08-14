import React from "react";
import { useDispatch } from "react-redux";
import { X } from "phosphor-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";
import CreateBankAccountModal from "./CreateBankAccountModal";
import {
  createUserAccountBankAction,
  deleteUserAccountBankAction,
} from "../../actions/user.actions";
import Loader from "../UI/Loader";

const schema = Yup.object().shape({
  nama_rek: Yup.string().required("Nama belum terisi"),
  no_rek: Yup.number()
    .typeError("Yang diisi harus angka")
    .required("Nomor rekening belum terisi"),
  nama_bank: Yup.string().required("Bank belum dipilih"),
});

const UserBankAccount = ({ accounts, onLoadProfile, loadingProfile }) => {
  const [modal, setModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: schema,
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      nama_rek: "",
      no_rek: "",
      nama_bank: "",
    },
    onSubmit: values => {
      // dispatch(authRegisterAction(values));
      setLoading(true);
      dispatch(createUserAccountBankAction(values))
        .then(res => {
          setLoading(false);

          formik.setFieldValue("no_rek", "");
          formik.setFieldValue("nama_rek", "");
          formik.setFieldValue("nama_bank", "");
          setModal(false);
          onLoadProfile();
        })
        .catch(err => {
          setModal(false);
          setLoading(false);
        });
    },
  });

  const handleCloseModal = e => {
    setModal(false);
  };

  const handleDelete = id => {
    // e.preventDefault();
    dispatch(deleteUserAccountBankAction(id))
      .then(res => {
        onLoadProfile();
      })
      .catch(err => {
        console.log(err);
      });
  };

  console.log(loadingProfile);

  return (
    <>
      <Card>
        <Card.Header className="bg-transparent text-dark text-uppercase font-weight-bold">
          Daftar Nomor Rekening
        </Card.Header>
        <Card.Body>
          {loadingProfile ? (
            <div className="w-100 d-flex justify-content-center text-primary">
              <Loader size={50} />
            </div>
          ) : (
            <Row>
              {" "}
              {accounts &&
                accounts.map(item => {
                  return (
                    <Col md={6} lg={4} key={item.id_akun} className="mb-4">
                      <Card className="  ">
                        <Card.Header className="bg-transparent text-right border-0 py-1">
                          <a
                            href="#/"
                            onClick={e => {
                              e.preventDefault();
                              handleDelete(item.id_akun);
                            }}
                          >
                            <X className="my-0 text-danger " />
                          </a>
                        </Card.Header>
                        <Card.Body className="pt-1 ">
                          {" "}
                          <Card.Title className="font-weight-normal my-0">
                            {item?.no_rek}
                          </Card.Title>
                          <h5 className="text-spacing-0 text-capitalize mt-1">
                            {item?.nama_rek}
                          </h5>
                          <p className="mt-1 mb-0">{item?.nama_bank}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          )}
        </Card.Body>
        <Card.Footer className="bg-transparent border-0">
          <div className="w-100 d-flex">
            <Button
              variant="outline-primary"
              size="sm"
              className="ml-auto"
              onClick={e => setModal(true)}
            >
              Tambah Akun
            </Button>
          </div>
        </Card.Footer>
      </Card>
      <CreateBankAccountModal
        loading={loading}
        show={modal}
        handleClose={handleCloseModal}
        formik={formik}
      />
    </>
  );
};

export default UserBankAccount;
