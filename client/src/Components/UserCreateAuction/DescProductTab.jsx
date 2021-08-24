import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Col, Container, Form, Row, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CreateAuctionSteps from "./CreateAuctionSteps";
import ReactQuill from "react-quill"; // ES6

import "react-quill/dist/quill.snow.css";

import { Link, useHistory } from "react-router-dom";
import ImageUploader from "../UI/ImageUploader";
import useImagesUploader from "../../hooks/useImagesUploader";
import { userAddAuctionDesc } from "../../actions/user.actions";

const formikSchema = Yup.object().shape({
  title: Yup.string().required("Judul produk belum terisi"),
  status: Yup.string().required("Kondisi Belum di pilih"),
  description: Yup.string(),
  images: Yup.array().test(
    "Images",
    "Belum ada gambar yang di upload",
    images => images.length !== 0
  ),
});

/*
.of(Yup.object().shape({
    file: Yup.
  })),
*/

const DescProductTab = () => {
  const createAuctionState = useSelector(state => state.userCreateAuction);
  const dispatch = useDispatch();
  const history = useHistory();
  const { category } = createAuctionState;

  const descriptionState = createAuctionState?.description;
  const defaultImages = descriptionState?.images;
  const uploader = useImagesUploader(defaultImages);
  const formik = useFormik({
    validationSchema: formikSchema,
    enableReinitialize: true,
    initialValues: {
      title: descriptionState?.title || "",
      status: descriptionState?.status || "100% baru",
      description: descriptionState?.description || "",
      images: uploader.images,
    },
    onSubmit: values => {
      dispatch(userAddAuctionDesc(values));
      history.push("/akun/buat-lelang?tab=harga-dan-durasi");
    },
  });

  const editorOnChange = value => {
    formik.setFieldValue("description", value);
  };

  React.useEffect(() => {
    if (!category) {
      history.push("/akun/buat-lelang?tab=category");
    }
  }, [category, history]);

  return (
    <Container fluid className=" px-md-8">
      <Row>
        <Col xs={12}>
          <CreateAuctionSteps step1 step2 currentStep="step2" />
        </Col>
      </Row>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col xs={12}>
            <div className="d-flex justify-content-end mb-3 ">
              {" "}
              <Link
                to="/akun/buat-lelang?tab=category"
                className="btn btn-primary"
              >
                Kembali
              </Link>
              <Button type="submit" className="ml-2">
                Next
              </Button>
            </div>
            <Card body className="pt-3 pb-5 mb-5">
              <Row>
                <Col md={6}>
                  <ImageUploader
                    images={uploader.images}
                    handleFile={uploader.handleFile}
                    handleDragOver={uploader.handleDragOver}
                    handleDrop={uploader.handleDrop}
                    handleRemove={uploader.handleRemoveImage}
                    error={formik.errors.images}
                  />
                  {/* {formik.errors.images && <span>{formik.errors.images}</span>} */}
                </Col>
                <Col md={6}>
                  <Form.Group controlId="title">
                    <Form.Label className=" text-dark ">
                      Judul Lelang
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Judul Lelang"
                      className=" bg-transparent border "
                      onChange={formik.handleChange}
                      value={formik.values.title}
                      isInvalid={formik.errors.title}
                    />
                    {formik.errors.title && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.title}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group controlId="status">
                    <Form.Label>Kondisi Produk</Form.Label>
                    <Form.Control
                      as="select"
                      className=" bg-transparent border "
                      isInvalid={formik.errors.status ? true : false}
                      onChange={formik.handleChange}
                      value={formik.values.status}
                    >
                      {[
                        "100% baru",
                        "Seperti baru",
                        "Bekas dengan kondisi baik",
                        "Bekas Dengan kondisi cacat",
                        "Rusak",
                      ].map((kondisi, idx) => {
                        {
                          /* const key = idx; */
                        }
                        return (
                          <option key={idx} value={kondisi}>
                            {kondisi}
                          </option>
                        );
                      })}
                    </Form.Control>
                    {formik.errors.status && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.status}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Deskripsi</Form.Label>
                    <ReactQuill
                      style={{
                        height: 120,
                      }}
                      value={formik.values.description}
                      onChange={editorOnChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card>{" "}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default DescProductTab;
