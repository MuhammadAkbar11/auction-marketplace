import React from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  Col,
  Row,
  ListGroup,
  Modal,
  Button,
  Alert,
} from "react-bootstrap";
import Loader from "../UI/Loader";
import { Link } from "react-router-dom";
import convertRupiah from "../../utils/convertRupiah";
import {
  getUserTrackShippingAction,
  putConfirmReceivedAction,
} from "../../actions/user.purchase.actions";

const UserCourierService = props => {
  const { data } = props;

  const [modalConfirm, setModalConfirm] = React.useState(false);
  const [loadingConfirm, setloadingConfirm] = React.useState(false);
  const [alert, setAlert] = React.useState(null);

  const dispatch = useDispatch();
  const destination = JSON.parse(data?.alamat_tujuan);

  const confirmReceived = () => {
    // setModalConfirm(true);

    setloadingConfirm(true);

    dispatch(putConfirmReceivedAction(data.id_transaksi))
      .then(() => {
        setloadingConfirm(false);
        setModalConfirm(false);
        setAlert({
          variant: "success",
          message: "Berhasil mengkonfirmasi penerimaan barang",
        });
        dispatch(getUserTrackShippingAction(data.id_transaksi));
      })
      .catch(err => {
        setAlert({
          variant: "danger",
          message: "Konfirmasi gagal! Silahkan coba lagi",
        });
        setModalConfirm(false);
        setloadingConfirm(false);
      });
  };

  React.useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(null);
      }, 7000);
    }
  }, [alert]);

  return (
    <>
      {alert && (
        <Alert variant={alert?.variant} className="my-3">
          {alert?.message}
        </Alert>
      )}
      <div className="">
        <h6 className="mb-1 text-dark">Id Transaksi</h6>
        <h2 className="mt-0 mb-4 text-primary ">{data?.id_transaksi}</h2>
      </div>

      <Card>
        <Card.Header className="border-0 bg-transparent pt-4">
          <p className="mb-1">Layanan Kurir</p>
          <h2 className="text-spacing-1 text-capitalize ">
            {+data?.pengiriman !== null ? (
              +data?.pengiriman?.status === 1 ? (
                <span className="text-success">Barang telah sampai tujuan</span>
              ) : (
                "Barang anda telah dikirim"
              )
            ) : (
              <span className="text-dark">Sedang proses pengiriman</span>
            )}
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
              {data?.pengiriman?.no_resi || "-"}
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
          <div className="d-flex">
            {" "}
            <Link to="/akun/pembelian" className="btn btn-outline-primary">
              Kembali
            </Link>
            {+data?.pengiriman?.status === 0 && (
              <Button
                variant="primary"
                onClick={() =>
                  +data?.pengiriman?.status === 0 ? setModalConfirm(true) : null
                }
                className="ml-2"
              >
                Telah diterima?
              </Button>
            )}
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
      <Modal centered show={modalConfirm} onHide={() => setModalConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi penerimaan barang?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!loadingConfirm ? (
            <>
              Apakah barang yang dikirim telah diterima? <br /> Klik{" "}
              <span className="font-weight-bold">Iya</span> jika telah diterima
            </>
          ) : (
            <Loader size={45} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={loadingConfirm}
            variant="outline-primary"
            onClick={() => setModalConfirm(false)}
          >
            Batalkan
          </Button>
          <Button
            variant="primary"
            onClick={confirmReceived}
            disabled={loadingConfirm}
          >
            Iya, telah diterima
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserCourierService;
