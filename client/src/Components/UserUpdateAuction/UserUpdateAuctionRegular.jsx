import React from "react";
import { Col, Form, Row, Card, InputGroup } from "react-bootstrap";
import { _dateFormat, _dateFormatInput } from "../../utils/date-format";
import convertRupiah from "../../utils/convertRupiah";

const UserUpdateAuctionRegular = props => {
  const { formik } = props;

  const dateStart =
    formik.values.dateStart !== ""
      ? new Date(formik.values.dateStart)
      : new Date();
  let dateEnd = new Date();
  dateEnd.setDate(dateStart.getDate() + +formik.values.duration);
  const formatDateEnd = _dateFormat(dateEnd);

  let maxBidList = [];

  for (let i = 1; i < 12; i++) {
    maxBidList.push({
      id: i,
      name: `${i}x`,
    });
  }

  return (
    <>
      <Row>
        <Col sm={12}>
          <h5 className="mb-3">Regular Data</h5>
        </Col>
        <Col md={6}>
          <Card.Title>Periode</Card.Title>

          <Row>
            <Col sm={6}>
              <Form.Group controlId="dateStart">
                <Form.Label className=" text-dark ">Tanggal mulai</Form.Label>
                <Form.Control
                  type="date"
                  className="  border "
                  // onChange={formik.handleChange}
                  value={_dateFormatInput(dateStart)}
                  // isInvalid={formik.errors.dateStart}
                  readOnly={true}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="timeStart">
                <Form.Label className=" text-dark ">Waktu mulai</Form.Label>
                <Form.Control
                  type="time"
                  className="  border "
                  value={formik.values.timeStart}
                  readOnly={true}
                />
                {/* {formik.errors.timeStart && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.timeStart}
                  </Form.Control.Feedback>
                )} */}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="duration">
            <Form.Label>Durasi</Form.Label>
            <Form.Control
              as="select"
              className=" bg-transparent border "
              isInvalid={formik.errors.duration}
              onChange={formik.handleChange}
              value={formik.values.duration}
            >
              {[
                {
                  value: 1,
                  name: "1 Hari",
                },
                {
                  value: 2,
                  name: "2 Hari",
                },
                {
                  value: 3,
                  name: "3 Hari",
                },
                {
                  value: 4,
                  name: "4 Hari",
                },
                {
                  value: 5,
                  name: "5 Hari",
                },
                {
                  value: 6,
                  name: "6 Hari",
                },
                {
                  value: 7,
                  name: "1 Minggu",
                },
              ].map((kondisi, idx) => {
                return (
                  <option key={idx} value={kondisi.value}>
                    {kondisi.name}
                  </option>
                );
              })}
            </Form.Control>
            {formik.errors.duration && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.duration}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="maxBid">
            <Form.Label>
              Seberapa sering tawaran anda akan di tawarkan kembali?
            </Form.Label>
            <Form.Control
              as="select"
              className=" bg-transparent border "
              isInvalid={formik.errors.maxBid}
              onChange={formik.handleChange}
              value={formik.values.maxBid}
            >
              {maxBidList.map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </Form.Control>
            {formik.errors.maxBid && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.maxBid}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Card.Title>Harga</Card.Title>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="openBid">
                <Form.Label>Harga Awal </Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="openBid">Rp</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    className=" bg-transparent border "
                    isInvalid={formik.errors.openBid}
                    onChange={e => {
                      const value = +e.target.value.replace(/[^\d]/g, "");
                      const result = convertRupiah(value);
                      formik.setFieldValue("openBid", result);
                    }}
                    value={formik.values.openBid}
                  />
                  {formik.errors.openBid && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.openBid}
                    </Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="multiples">
                <Form.Label>Kelipatan Bid </Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="multiples">Rp</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    className=" bg-transparent border "
                    isInvalid={formik.errors.multiples}
                    onChange={e => {
                      const value = +e.target.value.replace(/[^\d]/g, "");
                      const result = convertRupiah(value);
                      formik.setFieldValue("multiples", result);
                    }}
                    value={formik.values.multiples}
                  />
                  {formik.errors.multiples && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.multiples}
                    </Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Card body className="border-0 bg-light">
                <Row>
                  <Col sm={6}>
                    <p>Tanggal Berakhir : </p>
                    <p>{formatDateEnd}</p>
                  </Col>
                  <Col sm={6}>
                    <p>Tanggal Berakhir : </p>
                    <p>{formik.values.timeStart}</p>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default UserUpdateAuctionRegular;
