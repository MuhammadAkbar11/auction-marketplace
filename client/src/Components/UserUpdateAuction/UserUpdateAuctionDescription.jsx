import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Row,
  Form,
  Button,
  Modal,
  ListGroup,
  Card,
} from "react-bootstrap";

import ImageUploader from "../UI/ImageUploader";
import { CaretDown } from "phosphor-react";
import Loader from "../UI/Loader";
import ReactQuill from "react-quill"; // ES6

const UserUpdateAuctionDescription = props => {
  const { formik, handleUpload, oldImages } = props;

  const dispatch = useDispatch();

  const { categories, loading } = useSelector(state => state.categories);

  const [show, setShow] = React.useState(false);
  const [searchTerms, setSearchTerms] = React.useState("");
  const [selected, setSelected] = React.useState(formik.values.category);

  React.useEffect(() => {
    return () => {
      setShow(false);
    };
  }, []);

  const searchHandler = e => {
    const value = e.target.value;
    setSearchTerms(value);
  };

  const selectCategoryHandler = e => {
    e.preventDefault();
    // console.log(e);
    const idCat = e.target.id;
    setSelected(+idCat);
    formik.setFieldValue("category", +idCat);
    setShow(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editorOnChange = value => {
    formik.setFieldValue("description", value);
  };

  const defaultCategory = categories.filter(
    item => item.id_kategori === selected
  );

  return (
    <>
      <Row>
        <Col sm={12}>
          <h5 className="mb-3">Deskripsi</h5>
        </Col>
        <Col md={6}>
          <p>Gambar Lelang</p>
          <Row>
            {oldImages.map(pic => {
              return (
                <Col
                  className=" mb-3 px-2 "
                  xs={6}
                  sm={4}
                  md={3}
                  key={pic.id_galeri}
                >
                  <Card
                    className="h-100 border-0 "
                    style={{
                      maxHeight: 300,
                    }}
                  >
                    <Card.Img
                      src={pic.url}
                      className=" h-100 object-fit-cover "
                      alt={pic.id_galeri}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
          <ImageUploader
            images={handleUpload.images}
            handleFile={handleUpload.handleFile}
            handleDragOver={handleUpload.handleDragOver}
            handleDrop={handleUpload.handleDrop}
            handleRemove={handleUpload.handleRemoveImage}
            error={formik.errors.images}
          />
        </Col>

        <Col md={6}>
          <Form.Group controlId="title">
            <Form.Label className=" text-dark ">Judul Lelang</Form.Label>
            <Form.Control
              type="text"
              placeholder="Judul Lelang"
              className=" bg-transparent border "
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur}
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
              onBlur={formik.handleBlur}
              value={formik.values.status}
            >
              {[
                "100% baru",
                "Seperti baru",
                "Bekas dengan kondisi baik",
                "Bekas Dengan kondisi cacat",
                "Rusak",
              ].map((kondisi, idx) => {
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
            <div
              style={{
                height: "100%",
              }}
            >
              <ReactQuill
                value={formik.values.description}
                onChange={editorOnChange}
              />
            </div>
          </Form.Group>
          <Form.Group className="d-flex flex-column">
            <Form.Label>Kategori</Form.Label>
            <Button
              onClick={handleShow}
              className="bg-transparent border text-dark font-weight-normal text-left text-capitalize d-flex justify-content-between "
            >
              {defaultCategory[0]?.kategori}
              <CaretDown weight="bold" className="ml-auto" size={15} />
            </Button>
            {formik.errors.category && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.category}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Modal show={show} backdrop="static" onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Pilih Kategori anda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            placeholder="Ketik Kategori"
            onChange={searchHandler}
            value={searchTerms}
          />
          <br />
          {loading ? (
            <Loader size={20} variant="primary" />
          ) : (
            <ListGroup>
              {searchTerms !== ""
                ? categories
                    .filter(cat => {
                      const find = cat.kategori
                        .toLowerCase()
                        .includes(searchTerms.toLowerCase());
                      if (find) {
                        return cat;
                      }
                    })
                    .map(cat => {
                      return (
                        <ListGroup.Item
                          onClick={selectCategoryHandler}
                          key={cat.id_kategori}
                          id={cat.id_kategori}
                          action
                          className="my-0 font-weight-normal "
                          active={+cat.id_kategori === +selected}
                        >
                          {cat.kategori}
                        </ListGroup.Item>
                      );
                    })
                : categories.map(cat => {
                    return (
                      <ListGroup.Item
                        onClick={selectCategoryHandler}
                        key={cat.id_kategori}
                        id={cat.id_kategori}
                        action
                        className="my-0 font-weight-normal "
                        active={+cat.id_kategori === +selected}
                      >
                        {cat.kategori}
                      </ListGroup.Item>
                    );
                  })}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserUpdateAuctionDescription;
