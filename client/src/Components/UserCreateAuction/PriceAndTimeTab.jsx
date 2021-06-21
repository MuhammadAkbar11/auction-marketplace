import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Col,
  Container,
  Form,
  Row,
  Card,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CreateAuctionSteps from "./CreateAuctionSteps";
import { Link, Redirect, useHistory } from "react-router-dom";
import { _dateFormat } from "../../utils/date-format";
import convertRupiah from "../../utils/convertRupiah";
import { CloudFog } from "phosphor-react";
import {
  postUserCreateAuctionAction,
  userAddAuctionRegularData,
  userResetCreateAuction,
} from "../../actions/user.actions";
import Loader from "../UI/Loader";

const formikSchema = Yup.object().shape({
  openBid: Yup.string().required("Harga awal belum terisi"),
  multiples: Yup.string().required("Kelipatan bid belum terisi"),
  maxBid: Yup.string().required("Total Tawaran belum terisi"),
  duration: Yup.string().required("Durasi belum dipilih"),
  dateStart: Yup.string().required("Tanggal Mulai belum terisi"),
  timeStart: Yup.string().required("Tanggal Mulai belum terisi"),
});

const PriceAndTimeTab = () => {
  const createAuctionState = useSelector(state => state.userCreateAuction);
  const history = useHistory();
  const dispatch = useDispatch();

  const success = createAuctionState.success;
  const timePriceState = createAuctionState?.regular;
  const descriptionState = createAuctionState?.description;
  const formik = useFormik({
    validationSchema: formikSchema,
    enableReinitialize: true,
    initialValues: {
      openBid: timePriceState?.openBid || "",
      multiples: timePriceState?.multiples || "",
      maxBid: timePriceState?.maxBid || "",
      multiples: timePriceState?.multiples || "",
      duration: timePriceState?.duration || 1,
      dateStart: timePriceState?.dateStart || "",

      timeStart: timePriceState?.timeStart || "",
    },
    onSubmit: values => {
      dispatch(postUserCreateAuctionAction(values));
    },
  });

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

  React.useEffect(() => {
    if (success) {
      history.push("/akun/lelang");
    }
    return () => {
      if (success) {
        dispatch(userResetCreateAuction());
      }
    };
  }, [success]);

  return !descriptionState ? (
    <Redirect to="/akun/buat-lelang?tab=deskripsi" />
  ) : (
    <Container fluid className=" px-md-8">
      <Row>
        <Col xs={12}>
          <CreateAuctionSteps step1 step2 currentStep="step2" />
        </Col>
      </Row>
      <Form onSubmit={formik.handleSubmit}>
        {/* <input type="text" /> */}
        <Row>
          <Col xs={12}>
            <div className="d-flex justify-content-end mb-3 ">
              {" "}
              <Button
                onClick={() => {
                  dispatch(userAddAuctionRegularData(formik.values));
                  history.push("/akun/buat-lelang?tab=deskripsi");
                }}
                className="btn btn-primary"
              >
                Kembali
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="ml-2"
                disabled={createAuctionState.loading}
              >
                {createAuctionState.loading ? (
                  <>
                    <Loader size={11} />{" "}
                    <span className="ml-2"> Buat Lelang</span>
                  </>
                ) : (
                  "Buat Lelang"
                )}
              </Button>
              {/* <Button type="submit" className="ml-2" dis>
                Next
              </Button> */}
            </div>
            <Card body className="pt-3 pb-5 mb-5">
              <Row>
                <Col md={6}>
                  <Card.Title>Periode</Card.Title>
                  <Row>
                    <Col sm={6}>
                      <Form.Group controlId="dateStart">
                        <Form.Label className=" text-dark ">
                          Tanggal mulai
                        </Form.Label>
                        <Form.Control
                          type="date"
                          className=" bg-transparent border "
                          onChange={formik.handleChange}
                          value={formik.values.dateStart}
                          isInvalid={formik.errors.dateStart}
                        />
                        {formik.errors.dateStart && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.dateStart}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="timeStart">
                        <Form.Label className=" text-dark ">
                          Waktu mulai
                        </Form.Label>
                        <Form.Control
                          type="time"
                          className=" bg-transparent border "
                          onChange={formik.handleChange}
                          value={formik.values.timeStart}
                          isInvalid={formik.errors.timeStart}
                        />
                        {formik.errors.timeStart && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.timeStart}
                          </Form.Control.Feedback>
                        )}
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
                        const key = idx;
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
                              const value = +e.target.value.replace(
                                /[^\d]/g,
                                ""
                              );
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
                              const value = +e.target.value.replace(
                                /[^\d]/g,
                                ""
                              );
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
            </Card>{" "}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default PriceAndTimeTab;
