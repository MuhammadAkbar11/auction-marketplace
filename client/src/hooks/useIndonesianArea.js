import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = "https://dev.farizdotid.com/api/daerahindonesia";

const useIndonesianArea = (idProv, idKota, idKec) => {
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);

  const loadProvinsi = async () => {
    const result = await axios
      .get(`${apiUrl}/provinsi`)
      .then(res => res.data.provinsi);
    setProvinsi(result);
  };

  const loadKota = async (query, setVal = false, callback) => {
    const result = await axios
      .get(`${apiUrl}/kota?id_provinsi=${query}`)
      .then(res => res.data.kota_kabupaten);
    setKota(result);
    if (setVal) {
      callback && callback(result);
    }
  };
  const loadKecamatan = async (query, setVal = false, callback) => {
    const result = await axios
      .get(`${apiUrl}/kecamatan?id_kota=${query}`)
      .then(res => res.data.kecamatan);
    setKecamatan(result);
    if (setVal) {
      callback && callback(result);
    }
  };

  const loadKelurahan = async (query, setVal = false, callback) => {
    const result = await axios
      .get(`${apiUrl}/kelurahan?id_kecamatan=${query}`)
      .then(res => res.data.kelurahan);

    setKelurahan(result);
    if (setVal) {
      callback && callback(result);
    }
  };

  useEffect(() => {
    loadProvinsi();
    loadKota(idProv);
    loadKecamatan(idKota);
    console.log(idProv, idKota, idKec);
    loadKelurahan(idKec);
  }, [idProv, idKota, idKec]);

  const indonesiaArea = {
    provinsi,
    kota,
    kecamatan,
    kelurahan,
    loadProvinsi,
    loadKota,
    loadKecamatan,
    loadKelurahan,
  };

  return indonesiaArea;
};

export default useIndonesianArea;
