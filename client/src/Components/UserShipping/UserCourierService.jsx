import React from "react";
import { Card, Col, Row, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import convertRupiah from "../../utils/convertRupiah";

const UserCourierService = props => {
  const { data } = props;

  const destination = JSON.parse(data?.alamat_tujuan);

  return (
    <>
      <div>
        <h6 className="mb-1 text-dark">Id Transaksi</h6>
        <h2 className="mt-0 mb-4 text-primary ">{data?.id_transaksi}</h2>
      </div>

      <Card>
        <Card.Header className="border-0 bg-transparent pt-4">
          <p className="mb-1">Layanan Kurir</p>
          <h2 className="text-spacing-1 text-capitalize ">
            Barang Anda Sedang dikirim
          </h2>
        </Card.Header>
        <Card.Body className="pt-2">
          <Row className=" ">
            <Col sm={4} className="mb-3">
              <h6 className="mb-2">Alamat Tujuan</h6>
              <div>{destination.alamat}</div>
              <div>
                {destination.kelurahan}, {destination.kecamatan},{" "}
                {destination.kota}, <br />
                {destination.provinsi}, {destination?.kode_pos}
              </div>
            </Col>
            <Col sm={3}>
              <h6 className="mb-2">Penerima</h6>
              <div>
                {data.nama_penerima} <br />
                {data.nohp_penerima}
              </div>
            </Col>
            <Col sm={5}>
              <div className="mb-3">
                <h6 className="mb-2">Tgl dikirim</h6>
                <div className="d-flex">{data.pengiriman?.tgl_dikirim}</div>
              </div>
              {/* <div>
                <h6 className="mb-2">Tgl diterima</h6>
                <div className="d-flex">
                  {data.pengiriman?.tgl_diteriman || (
                    <small className="text-danger">Sedang dikirim</small>
                  )}
                </div>
              </div> */}
            </Col>
          </Row>

          <div className="mb-5 mt-3">
            <h6 className="mb-2">No Resi</h6>
            <h1 className="text-primary font-weight-bold">
              {data?.pengiriman?.no_resi}
            </h1>
          </div>

          <div className="d-flex flex-wrap">
            <div className="d-flex flex-grow-1">
              <img
                style={{
                  width: 130,
                }}
                src={`${data?.lelang?.gambar[0].url}`}
                alt=""
                className="pr-3"
              />
              <p className="text-spacing-1 text-dark font-weight-bold  text-capitalize">
                {data?.lelang?.judul}
              </p>
            </div>
            <div className="flex-grow-1">
              <h6 className="mb-1 text-black text-uppercase ">harga awal</h6>
              <p>Rp. {data?.lelang?.hrg_awal}</p>
            </div>
            <div className="flex-grow-1">
              <h6 className="mb-1 text-black text-uppercase ">harga akhir</h6>
              <p className="text-primary">
                Rp. {convertRupiah(+data?.tawaran?.nilai_tawaran)}
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Row className="mt-5">
        <Col>
          <div>
            {" "}
            <Link to="/akun/pembelian" className="btn btn-outline-primary">
              Kembali
            </Link>
          </div>
        </Col>
        <Col className="ml-auto" sm={4}>
          <ListGroup className="pl-0  ">
            <ListGroup.Item className="pl-0 border-0 pt-0 pb-1   ">
              <div className="d-flex flex-lg-row justify-content-between ">
                <div className=" text-gray-600">Sub Total</div>
                <div className=" text-primary ">
                  Rp. {convertRupiah(+data?.total_harga - +data?.ongkir)}
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="pl-0 border-top-0 border-left-0 border-right-0 pt-1 pb-2   ">
              <div className="d-flex flex-lg-row justify-content-between ">
                <div className=" text-gray-600    ">Ongkir</div>
                <div className=" text-primary ">
                  Rp. {convertRupiah(+data?.ongkir)}
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="pl-0 border-0 pt-2 pb-1   ">
              <div className="d-flex flex-lg-row justify-content-between ">
                <div className=" text-primary font-weight-bold">Total</div>
                <div className=" text-primary font-weight-bold">
                  Rp. {convertRupiah(+data?.total_harga)}
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default UserCourierService;
