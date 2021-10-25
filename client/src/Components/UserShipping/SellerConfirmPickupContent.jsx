import React from "react";
import { Alert, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import convertRupiah from "../../utils/convertRupiah";

import { Link } from "react-router-dom";
import useIndonesianArea from "../../hooks/useIndonesianArea";

const SellerConfirmPickupContent = ({
  data,
  loading,
  errors,
  onCloseErrors,
  onShowModal,
}) => {
  const { id_provinsi, id_kota, id_kecamatan, id_kelurahan, alamat, kode_pos } =
    JSON.parse(data?.lelang?.alamat_barang);
  const indonesianArea = useIndonesianArea(id_provinsi, id_kota, id_kecamatan);
  const { provinsi, kota, kecamatan, kelurahan } = indonesianArea;
  const destination = {
    alamat,
    kode_pos,
    provinsi: provinsi.filter(prv => prv.id === +id_provinsi)[0],
    kota: kota.filter(kota => kota.id === +id_kota)[0],
    kecamatan: kecamatan.filter(kecamatan => kecamatan.id === +id_kecamatan)[0],
    kelurahan: kelurahan.filter(kelurahan => kelurahan.id === +id_kelurahan)[0],
  };

  const auction = data?.lelang;

  return (
    <main>
      <section className="my-3">
        {errors && (
          <Alert
            variant="danger"
            onClose={() => onCloseErrors(false)}
            dismissible
          >
            <p>Konfirmasi gagal! silahkan coba lagi</p>
          </Alert>
        )}
      </section>
      <section>
        <h4>Konfirmasi pengiriman</h4>
        <p>ID {data?.id_transaksi}</p>
        {/* <Form onSubmit={handleSubmit}> */}
        <Row>
          <Col lg={6}>
            <Card className="border-0 pl-0">
              <Card.Body className="pl-0">
                <div className="mb-3">
                  <h6 className="mb-2">Alamat Jemputan</h6>
                  <div>{destination.alamat}</div>
                  <div className="mt-1">
                    {destination.kelurahan?.nama}, {destination.kecamatan?.nama}
                    , {destination.kota?.nama}, <br />
                    {destination.provinsi?.nama}, {destination?.kode_pos}
                  </div>
                </div>

                <div className="mt-3 mb-3">
                  <h6 className="mb-2">Penjemput</h6>
                  <div>
                    {data.nama_penerima} <br />
                    {data.nohp_penerima}
                  </div>
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
                    <div className="d-flex flex-row justify-content-between ">
                      <div className=" d-flex flex-column flex-md-row text-gray-600">
                        <img
                          style={{
                            width: 80,
                          }}
                          src={`${auction?.gambar[0].url}`}
                          alt=""
                          className="pr-2"
                        />
                        <p className="text-spacing-1 text-gray-600 mt-1  text-capitalize">
                          {auction?.judul}
                        </p>
                      </div>
                      <div className=" text-primary ">
                        Rp. {convertRupiah(+data?.total_harga - +data?.ongkir)}
                      </div>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className="pl-0 border-top-0 border-left-0 border-right-0 pt-1 pb-2   ">
                    <div className="d-flex flex-row justify-content-between ">
                      <div className=" text-gray-600    ">Ongkir</div>
                      <div className=" text-primary ">
                        Rp. {convertRupiah(+data?.ongkir)}
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="pl-0 border-0 pt-2 pb-1   ">
                    <div className="d-flex flex-row justify-content-between ">
                      <div className=" text-primary font-weight-bold">
                        Total Harga
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
          <Col xs={12} className="d-flex mt-3">
            <Link
              to="/akun/lelang?tab=sold"
              className="btn btn-outline-primary mr-2"
            >
              {" "}
              Kembali{" "}
            </Link>
            <Button
              variant="primary"
              disabled={loading}
              onClick={onShowModal}
              type="submit"
            >
              Konfirmasi Jemputan
            </Button>
          </Col>
        </Row>
        {/* </Form> */}
      </section>
    </main>
  );
};

export default SellerConfirmPickupContent;
