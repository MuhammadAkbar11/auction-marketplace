import React from "react";
import * as yup from "yup";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import convertRupiah from "../../utils/convertRupiah";
import { convertYupErrorsToObject } from "../../utils/checkObj";
import { useDispatch } from "react-redux";
import { postConfirmShippingAction } from "../../actions/user.actions";
import { Link, useHistory } from "react-router-dom";

const schema = yup.object().shape({
  no_resi: yup
    .number()
    .typeError("Nomor resi harus berupa angka")
    .required("Nomor resi belum terisi"),
});

const ConfirmShippingContent = ({ data }) => {
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(false);
  const [resiInput, setResiInput] = React.useState(
    data?.pengiriman?.no_resi || ""
  );
  const [resiInputErr, setResiInputErr] = React.useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const destination = JSON.parse(data?.alamat_tujuan);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrors(false);
    setResiInputErr(null);
    // return;
    try {
      const values = await schema.validateSync({
        no_resi: resiInput,
      });

      await dispatch(
        postConfirmShippingAction({
          id_transaksi: data.id_transaksi,
          ...values,
        })
      );
      setLoading(false);
      history.push("/akun/lelang?tab=sold");
    } catch (err) {
      // console.log(errs.errors);
      // const errMsg = convertYupErrorsToObject(errs.errors);
      setLoading(false);
      if (err.name === "ValidationError") {
        setResiInputErr(err.errors[0]);
      } else {
        setErrors(true);
      }
    }
  };

  console.log(data);
  return (
    <main>
      <section className="my-3">
        {errors && (
          <Alert variant="danger" onClose={() => setErrors(false)} dismissible>
            <p>Konfirmasi gagal! silahkan coba lagi</p>
          </Alert>
        )}
      </section>
      <section>
        <h4>Konfirmasi pengiriman</h4>
        <p>ID {data?.id_transaksi}</p>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={6}>
              <Card className="border-0 pl-0">
                <Card.Body className="pl-0">
                  <div className="mb-3">
                    <h6 className="mb-2">Alamat Tujuan</h6>
                    <div>{destination.alamat}</div>
                    <div>
                      {destination.kelurahan}, {destination.kecamatan},{" "}
                      {destination.kota}, <br />
                      {destination.provinsi},
                    </div>
                  </div>

                  <div className="mt-3 mb-3">
                    <h6 className="mb-2">Penerima</h6>
                    <div>
                      {data.nama_penerima} <br />
                      {data.nohp_penerima}
                    </div>
                  </div>
                  <div className="mt-3 mb-3">
                    <h6 className="mb-2">Nomor Resi</h6>

                    <Form.Group controlId="no_resi">
                      <Form.Control
                        type="text"
                        placeholder="Nomor Resi"
                        name="no_resi"
                        value={resiInput}
                        className="bg-transparent border"
                        onChange={e => setResiInput(e.target.value)}
                        isInvalid={!!resiInputErr}
                      />
                      <Form.Control.Feedback type="invalid">
                        {resiInputErr}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <Card.Header className=" d-flex justify-content-between border-bottom-0  bg-transparent pb-0">
                  <Card.Title className="mb-0">Ringkasan</Card.Title>
                </Card.Header>
                <Card.Body>
                  <p>
                    Silahkan masukan no resi untuk mengkonfirmasi pengiriman
                    barang
                  </p>
                  <ListGroup className="pl-0  ">
                    <ListGroup.Item className="pl-0 border-0 pt-0 pb-1   ">
                      <div className="d-flex flex-column flex-md-column flex-lg-row justify-content-between ">
                        <div className=" text-gray-600">Sub Total</div>
                        <div className=" text-primary ">
                          Rp.{" "}
                          {convertRupiah(+data?.total_harga - +data?.ongkir)}
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="pl-0 border-top-0 border-left-0 border-right-0 pt-1 pb-2   ">
                      <div className="d-flex flex-column flex-md-column flex-lg-row justify-content-between ">
                        <div className=" text-gray-600    ">Ongkir</div>
                        <div className=" text-primary ">
                          Rp. {convertRupiah(+data?.ongkir)}
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="pl-0 border-0 pt-2 pb-1   ">
                      <div className="d-flex flex-column flex-md-column flex-lg-row justify-content-between ">
                        <div className=" text-primary font-weight-bold">
                          Total
                        </div>
                        <div className=" text-primary font-weight-bold">
                          Rp. {convertRupiah(+data?.total_harga)}
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} className="d-flex ">
              <Link
                to="/akun/lelang?tab=sold"
                className="btn btn-outline-primary mr-2"
              >
                {" "}
                Kembali{" "}
              </Link>
              <Button variant="primary" disabled={loading} type="submit">
                Konfirmasi
              </Button>
            </Col>
          </Row>
        </Form>
      </section>
    </main>
  );
};

export default ConfirmShippingContent;
