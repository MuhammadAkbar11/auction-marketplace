import React from "react";
import { Card, Col, Row, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import useIndonesianArea from "../../hooks/useIndonesianArea";
import convertRupiah from "../../utils/convertRupiah";

const UserPickupService = props => {
  const { data } = props;

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

  return (
    <>
      <div>
        <h6 className="mb-1 text-dark">Id Transaksi</h6>
        <h2 className="mt-0 mb-4 text-primary ">{data?.id_transaksi}</h2>
      </div>

      <Card>
        <Card.Header className="border-0 bg-transparent pt-4">
          <p className="mb-1">Jemput ditempat</p>
          <h2 className="text-spacing-1 text-capitalize ">
            Sedang menunggu jemputan
          </h2>
        </Card.Header>
        <Card.Body className="pt-2">
          <Row className=" ">
            <Col sm={4} className="mb-3">
              <h6 className="mb-2">Alamat jemputan</h6>
              {indonesianArea.loading?.kelurahan ? (
                <div
                  className="w-100 bg-gray-100 border-0"
                  style={{
                    height: 25,
                  }}
                />
              ) : (
                <>
                  <div>{destination?.alamat}</div>
                  <div>
                    {destination?.kelurahan?.nama},{" "}
                    {destination?.kecamatan?.nama}, {destination?.kota?.nama},{" "}
                    <br />
                    {destination?.provinsi?.nama}, {destination?.kode_pos}
                  </div>
                </>
              )}
            </Col>
            <Col sm={3}>
              <h6 className="mb-2">Penjemput</h6>
              <div>
                {data.nama_penerima} <br />
                {data.nohp_penerima}
              </div>
            </Col>
          </Row>

          <h6>Info Barang</h6>
          <div className="d-flex flex-wrap mt-3">
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

export default UserPickupService;
