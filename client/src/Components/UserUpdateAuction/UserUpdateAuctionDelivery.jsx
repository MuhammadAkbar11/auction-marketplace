import React from "react";
import { Row, Col, Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import { Check } from "phosphor-react";
import useIndonesianArea from "../../hooks/useIndonesianArea";

const UserUpdateAuctionDelivery = ({ formik }) => {
  const idProv = formik.values.id_provinsi;
  const idKota = formik.values.id_kota;
  const idKec = formik.values.id_kecamatan;

  const indonesiaArea = useIndonesianArea(idProv, idKota, idKec);

  console.log(idProv, idKota, idKec);

  const handleChangeTypeDeliery = e => {
    const name = e.target.name;

    const obj = formik.values.jenis_pengiriman;

    const newObj = {
      ...obj,
      [name]: e.currentTarget.checked,
    };

    formik.setFieldValue("jenis_pengiriman", newObj);
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

  console.log(formik.values?.jenis_pengiriman);

  return (
    <>
      <Row className="mt-3">
        <Col sm={12}>
          <h5 className="mb-3 ">Pengiriman</h5>
        </Col>
        <Col sm={6}>
          <Form.Group controlId="alamat">
            <Form.Label>Alamat</Form.Label>
            <Form.Control
              as="textarea"
              className={`bg-transparent border`}
              // disabled={followUserAddress}
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
          <Form.Group controlId="id_provinsi">
            <Form.Label>Provinsi</Form.Label>
            <Form.Control
              className={`bg-transparent  border`}
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
            {formik.errors.id_provinsi ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.id_provinsi}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
          {/*  start */}
          <Form.Group controlId="id_kota">
            <Form.Label>Kota</Form.Label>
            <Form.Control
              className={`bg-transparent  border`}
              as="select"
              onChange={handleChangeKota}
              onBlur={formik.handleBlur}
              value={formik.values.id_kota}
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

          {/*  start */}
          <Form.Group controlId="id_kecamatan">
            <Form.Label>Kecamatan</Form.Label>
            <Form.Control
              className={`bg-transparent  border`}
              as="select"
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
          {/*  start */}
          <Form.Group controlId="id_kelurahan">
            <Form.Label>Kelurahan</Form.Label>
            <Form.Control
              className={`bg-transparent  border`}
              as="select"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.id_kelurahan}
              isInvalid={formik.errors.id_kelurahan ? true : false}
            >
              {indonesiaArea.kelurahan.map(kelurahan => {
                return kelurahan.id === formik.values.id_kelurahan ? (
                  <option selected key={kelurahan.id} value={kelurahan.id}>
                    {kelurahan.nama}
                  </option>
                ) : (
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
          <Form.Group controlId="kode_pos">
            <Form.Label>Kode Pos</Form.Label>
            <Form.Control
              type="text"
              className={`bg-transparent  border`}
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
        </Col>
        <Col sm={6}>
          <Form.Group>
            <Form.Label>Jenis Pengiriman</Form.Label>
            <Row>
              <Col xs={12} lg={3} className="mb-2">
                <ButtonGroup toggle className="">
                  <ToggleButton
                    type="checkbox"
                    // variant="success"
                    name="pickup"
                    className="p-0 d-flex bg-white border border-gray-400 shadow-none  rounded-sm "
                    checked={formik.values?.jenis_pengiriman?.pickup}
                    value={1}
                    onChange={e => handleChangeTypeDeliery(e)}
                  >
                    <div
                      className={`px-2 py-2 ${
                        formik.values?.jenis_pengiriman?.pickup
                          ? "bg-success"
                          : "bg-gray-400"
                      }  text-white`}
                    >
                      {formik.values?.jenis_pengiriman?.pickup ? (
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
                        formik.values?.jenis_pengiriman?.pickup
                          ? "text-gray-600"
                          : "text-gray-700"
                      } font-weight-lighter  text-capitalize `}
                    >
                      Pick up
                    </span>
                  </ToggleButton>
                </ButtonGroup>
              </Col>
              <Col xs={12} lg={5}>
                <ButtonGroup toggle className="h-auto">
                  <ToggleButton
                    type="checkbox"
                    // variant="success"
                    name="courier_service"
                    className="p-0 d-flex bg-white border border-gray-400 shadow-none  rounded-sm "
                    checked={formik.values?.jenis_pengiriman?.courier_service}
                    value={1}
                    onChange={e => handleChangeTypeDeliery(e)}
                  >
                    <div
                      className={`px-2 py-2 ${
                        formik.values?.jenis_pengiriman?.courier_service
                          ? "bg-success"
                          : "bg-gray-400"
                      }  text-white`}
                    >
                      {formik.values?.jenis_pengiriman?.courier_service ? (
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
                        formik.values?.jenis_pengiriman?.courier_service
                          ? "text-gray-600"
                          : "text-gray-700"
                      } font-weight-lighter  text-capitalize `}
                    >
                      Courier Service
                    </span>
                  </ToggleButton>
                </ButtonGroup>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label>Dimensi Barang (cm)</Form.Label>
            <Form.Row>
              <Col>
                <Form.Group controlId="panjang">
                  <Form.Control
                    type="text"
                    className="bg-transparent border"
                    placeholder="Panjang"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.panjang}
                    isInvalid={formik.errors.panjang ? true : false}
                  />
                  {formik.errors.panjang ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.panjang}
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="lebar">
                  <Form.Control
                    className="bg-transparent border"
                    type="text"
                    placeholder="Lebar"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lebar}
                    isInvalid={formik.errors.lebar ? true : false}
                  />
                  {formik.errors.lebar ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.lebar}
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="tinggi">
                  <Form.Control
                    type="text"
                    className="bg-transparent border"
                    placeholder="Tinggi"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.tinggi}
                    isInvalid={formik.errors.tinggi ? true : false}
                  />
                  {formik.errors.tinggi ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.tinggi}
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group controlId="berat">
            <Form.Label>Berat Barang (gram)</Form.Label>
            <Form.Control
              type="text"
              className="bg-transparent border"
              placeholder="Berat"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.berat}
              isInvalid={formik.errors.berat ? true : false}
            />
            {formik.errors.berat ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.berat}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
          <Form.Group controlId="biaya_packing">
            <Form.Label>Biaya Packing</Form.Label>
            <Form.Control
              type="text"
              className="bg-transparent border"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.biaya_packing}
              isInvalid={formik.errors.biaya_packing ? true : false}
            />
            {formik.errors.biaya_packing ? (
              <Form.Control.Feedback type="invalid">
                {formik.errors.biaya_packing}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default UserUpdateAuctionDelivery;
