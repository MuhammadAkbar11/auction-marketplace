import React from "react";
import { useDispatch } from "react-redux";
import {
  Col,
  Form,
  Row,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { Check } from "phosphor-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useIndonesianArea from "../../hooks/useIndonesianArea";
import { postUserWinConfirmAction } from "../../actions/user.purchase.actions";
import { useHistory } from "react-router-dom";

const formikSchema = Yup.object().shape({
  nama_penerima: Yup.string().required("Nama penerima belum terisi"),
  nohp_penerima: Yup.number()
    .typeError("No Hp harus angka")
    .required("Nomor Hp belum terisi"),
  id_provinsi: Yup.string().required("Silahkan pilih provinsi"),
  id_kota: Yup.string().required("Silahkan pilih kota"),
  id_kecamatan: Yup.string().required("Silahkan pilih kecamata"),
  id_kelurahan: Yup.string().required("Silahkan pilih kelurahan"),
  alamat: Yup.string().required("Alamat belum terisi"),
  kode_pos: Yup.string().required("Kode Pos belum terisi"),
  jenis_pengiriman: Yup.string().required("Pilih jenis pengriman belum terisi"),
});

const UserConfirmWinForm = ({ user, invoiceId, loading, data }) => {
  const [followUserAddress, setFollowUserAddress] = React.useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    validationSchema: formikSchema,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      nama_penerima: "",
      nohp_penerima: "",
      id_provinsi: "",
      id_kota: "",
      id_kecamatan: "",
      id_kelurahan: "",
      alamat: "",
      kode_pos: "",
      jenis_pengiriman: "",
      biaya_packing: data?.lelang?.biaya_packing || 0,
    },
    onSubmit: values => {
      dispatch(
        postUserWinConfirmAction({ id_transaksi: invoiceId, ...values })
      ).then(() => {
        history.push("/akun/pembelian");
      });
    },
  });

  const idProv = formik.values.id_provinsi;
  const idKota = formik.values.id_kota;
  const idKec = formik.values.id_kecamatan;

  const indonesiaArea = useIndonesianArea(idProv, idKota, idKec);

  const handleCheckedByUserAddress = e => {
    setFollowUserAddress(e.currentTarget.checked);

    if (e.currentTarget.checked) {
      formik.setFieldValue("alamat", user?.alamat);
      indonesiaArea.loadProvinsi();
      indonesiaArea.loadKota(user?.id_provinsi);
      indonesiaArea.loadKecamatan(user?.id_kota);
      indonesiaArea.loadKelurahan(user?.id_kecamatan);

      formik.setFieldValue("id_provinsi", user?.id_provinsi);
      formik.setFieldValue("id_kota", user?.id_kota);
      formik.setFieldValue("id_kecamatan", user?.id_kecamatan);
      formik.setFieldValue("id_kelurahan", user?.id_kelurahan);
      formik.setFieldValue("kode_pos", user?.kode_pos);
    }
  };

  const handleChangeProvinsi = e => {
    formik.setFieldValue("id_provinsi", e.target.value);
    indonesiaArea.loadKota(e.target.value, true, result => {
      formik.setFieldValue("id_kota", result[0]?.id);
    });
    indonesiaArea.loadKecamatan(formik.values.id_kota, true, result => {
      formik.setFieldValue("id_kecamatan", result[0]?.id);
    });
    indonesiaArea.loadKelurahan(formik.values.id_kecamatan, true, result => {
      formik.setFieldValue("id_kelurahan", result[0]?.id);
    });
  };

  const handleChangeKota = e => {
    formik.setFieldValue("id_kota", e.target.value);
    indonesiaArea.loadKecamatan(e.target.value, true, result => {
      formik.setFieldValue("id_kecamatan", result[0]?.id);
    });
    indonesiaArea.loadKelurahan(formik.values.id_kec, true, result => {
      formik.setFieldValue("id_kelurahan", result[0]?.id);
    });
  };

  const handleChangeKecamatan = e => {
    formik.setFieldValue("id_kecamatan", e.target.value);
    indonesiaArea.loadKecamatan(formik.values.id_kota, true, result => {
      formik.setFieldValue("id_kecamatan", result[0]?.id);
    });
    indonesiaArea.loadKelurahan(e.target.value, true, result => {
      formik.setFieldValue("id_kelurahan", result[0]?.id);
    });
  };

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <div className="pt-3">
          <h6>Data Penerima / Pengambil</h6>
          <Row>
            <Col md={6}>
              <Form.Group controlId="nama_penerima">
                <Form.Label>Nama </Form.Label>
                <Form.Control
                  type="text"
                  className={` bg-transparent border`}
                  onChange={formik.handleChange}
                  value={formik.values.nama_penerima}
                  isInvalid={formik.errors.nama_penerima ? true : false}
                />
                {formik.errors.nama_penerima ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.nama_penerima}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="nohp_penerima">
                <Form.Label>Nomor Hp </Form.Label>
                <Form.Control
                  type="text"
                  className={` bg-transparent border`}
                  onChange={formik.handleChange}
                  value={formik.values.nohp_penerima}
                  isInvalid={formik.errors.nohp_penerima ? true : false}
                />
                {formik.errors.nohp_penerima ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.nohp_penerima}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div className="pt-3">
          <h6>Alamat Tujuan</h6>
          <ButtonGroup toggle className=" mb-3 mt-3">
            <ToggleButton
              type="checkbox"
              className="p-0 d-flex bg-white border border-gray-400 shadow-none  rounded-sm "
              checked={followUserAddress}
              value="1"
              onChange={e => handleCheckedByUserAddress(e)}
            >
              <div
                className={`px-2 py-2 ${
                  followUserAddress ? "bg-success" : "bg-gray-400"
                }  text-white`}
              >
                {followUserAddress ? (
                  <Check size={18} />
                ) : (
                  <Check
                    style={{
                      opacity: 0,
                    }}
                    size={18}
                  />
                )}
              </div>
              <span
                className={`px-3  py-2 ${
                  followUserAddress ? "text-gray-600" : "text-gray-700"
                } font-weight-lighter  text-capitalize `}
              >
                Menurut Alamat terdaftar
              </span>
            </ToggleButton>
          </ButtonGroup>
          <Form.Group controlId="alamat">
            <Form.Label>Alamat</Form.Label>
            <Form.Control
              as="textarea"
              className={` ${!followUserAddress && "bg-transparent"}  border`}
              disabled={followUserAddress}
              onChange={formik.handleChange}
              rows={3}
              value={formik.values.alamat}
              isInvalid={formik.errors.alamat ? true : false}
            />
            {formik.errors.alamat ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.alamat}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group controlId="id_provinsi">
                <Form.Label>Provinsi</Form.Label>
                {!indonesiaArea.loading?.provinsi ? (
                  <Form.Control
                    className={` ${
                      !followUserAddress && "bg-transparent"
                    }  border`}
                    disabled={followUserAddress}
                    as="select"
                    onChange={handleChangeProvinsi}
                    onBlur={formik.handleBlur}
                    value={formik.values.id_provinsi}
                    isInvalid={formik.errors.id_provinsi ? true : false}
                  >
                    {indonesiaArea.provinsi.map(prov => {
                      return (
                        <option key={prov.id} value={prov.id}>
                          {prov.nama}
                        </option>
                      );
                    })}
                  </Form.Control>
                ) : (
                  <Form.Control
                    type="text"
                    disabled
                    defaultValue="Loading..."
                  />
                )}

                {formik.errors.id_provinsi ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.id_provinsi}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            </Col>
            <Col md={6}>
              {/*  start */}
              <Form.Group controlId="id_kota">
                <Form.Label>Kota</Form.Label>
                <Form.Control
                  className={` ${
                    !followUserAddress && "bg-transparent"
                  }  border`}
                  as="select"
                  onChange={handleChangeKota}
                  onBlur={formik.handleBlur}
                  value={formik.values.id_kota}
                  disabled={followUserAddress}
                  isInvalid={formik.errors.id_kota ? true : false}
                >
                  {indonesiaArea.kota.map(kota => {
                    return (
                      <option key={kota.id} value={kota.id}>
                        {kota.nama}
                      </option>
                    );
                  })}
                </Form.Control>

                {formik.errors.id_kota ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.id_kota}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
              {/* end */}
            </Col>
            <Col md={6}>
              {/*  start */}
              <Form.Group controlId="id_kecamatan">
                <Form.Label>Kecamatan</Form.Label>
                <Form.Control
                  className={` ${
                    !followUserAddress && "bg-transparent"
                  }  border`}
                  as="select"
                  disabled={followUserAddress}
                  onChange={handleChangeKecamatan}
                  onBlur={formik.handleBlur}
                  value={formik.values.id_kecamatan}
                  isInvalid={formik.errors.id_kecamatan ? true : false}
                >
                  {indonesiaArea.kecamatan.map(kec => {
                    return (
                      <option key={kec.id} value={kec.id}>
                        {kec.nama}
                      </option>
                    );
                  })}
                </Form.Control>

                {formik.errors.id_kecamatan ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.id_kecamatan}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
              {/* end */}
            </Col>
            <Col md={6}>
              {/*  start */}
              <Form.Group controlId="id_kelurahan">
                <Form.Label>Kelurahan</Form.Label>
                <Form.Control
                  className={` ${
                    !followUserAddress && "bg-transparent"
                  }  border`}
                  as="select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={followUserAddress}
                  value={formik.values.id_kelurahan}
                  isInvalid={formik.errors.id_kelurahan ? true : false}
                >
                  {indonesiaArea.kelurahan.map(kelurahan => {
                    return (
                      <option key={kelurahan.id} value={kelurahan.id}>
                        {kelurahan.nama}
                      </option>
                    );
                  })}
                </Form.Control>

                {formik.errors.id_kelurahan ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.id_kelurahan}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
              {/* end */}
            </Col>
            <Col md={6}>
              {/* start */}
              <Form.Group controlId="kode_pos">
                <Form.Label>Kode Pos</Form.Label>
                <Form.Control
                  type="text"
                  className={` ${
                    !followUserAddress && "bg-transparent"
                  }  border`}
                  disabled={followUserAddress}
                  onChange={formik.handleChange}
                  value={formik.values.kode_pos}
                  isInvalid={formik.errors.kode_pos ? true : false}
                />
                {formik.errors.kode_pos ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.kode_pos}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
              {/* end */}
            </Col>
            <Col md={6}>
              <Form.Group controlId="jenis_pengiriman">
                <Form.Label>Jenis Pengiriman</Form.Label>
                <Form.Control
                  className={`bg-transparent border`}
                  as="select"
                  onChange={formik.handleChange}
                  value={formik.values.jenis_pengiriman}
                  isInvalid={formik.errors.jenis_pengiriman ? true : false}
                >
                  <option value="">-- pilih jenis pengiriman --</option>
                  {/* <option value="PICKUP">Ambil ditempat</option> */}

                  <option value="COURIER_SERVICE">
                    Layanan Kurir (barang akan dikirim penjual melalui layanan
                    kurir)
                  </option>
                  <option value="PICKUP">
                    Jemput ditempat (mengambil barang dilokasi penjual)
                  </option>
                </Form.Control>
                {formik.errors.jenis_pengiriman ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.jenis_pengiriman}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            </Col>
          </Row>
          <Button className="mt-2" type="submit" disabled={loading}>
            {loading ? "mengirim..." : "Konfirmasi sekarang"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default UserConfirmWinForm;
