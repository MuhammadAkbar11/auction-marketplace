import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = "https://dev.farizdotid.com/api/daerahindonesia";

const useIndonesianArea = (idProv, idKota, idKec) => {
  const [loading, setLoading] = useState({
    provinsi: false,
    kota: false,
    kecamatan: false,
    kelurahan: false,
  });
  const [errors, setErrors] = useState({
    provinsi: null,
    kota: null,
    kecamatan: null,
    kelurahan: null,
  });
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);

  const loadProvinsi = async () => {
    setLoading({
      provinsi: true,
      kota: true,
      kecamatan: true,
      kelurahan: true,
    });
    const result = await axios
      .get(`${apiUrl}/provinsi`)
      .then(res => {
        setLoading(ps => ({
          provinsi: false,
          kota: false,
          kecamatan: false,
          kelurahan: false,
        }));
        return res.data.provinsi;
      })
      .catch(err => {
        setErrors(ps => ({ ...ps, provinsi: err }));
        setLoading(ps => ({
          provinsi: false,
          kota: false,
          kecamatan: false,
          kelurahan: false,
        }));
        return [];
      });
    setProvinsi(result);
  };

  const loadKota = async (query, setVal = false, callback) => {
    setLoading(ps => ({ ...ps, kota: true, kecamatan: true, kelurahan: true }));
    const result = await axios
      .get(`${apiUrl}/kota?id_provinsi=${query}`)
      .then(res => {
        setLoading(ps => ({
          ...ps,
          kota: false,
          kecamatan: false,
          kelurahan: false,
        }));
        return res.data.kota_kabupaten;
      })
      .catch(err => {
        setErrors(ps => ({ ...ps, kota: err }));
        setLoading(ps => ({
          ...ps,
          kota: false,
          kecamatan: false,
          kelurahan: false,
        }));
        return [];
      });
    setKota(result);
    if (setVal) {
      callback && callback(result);
    }
  };
  const loadKecamatan = async (query, setVal = false, callback) => {
    setLoading(ps => ({ ...ps, kecamatan: true, kelurahan: true }));
    const result = await axios
      .get(`${apiUrl}/kecamatan?id_kota=${query}`)
      .then(res => {
        setLoading(ps => ({ ...ps, kecamatan: false, kelurahan: false }));
        return res.data.kecamatan;
      })
      .catch(err => {
        setErrors(ps => ({ ...ps, kecamatan: err }));
        setLoading(ps => ({ ...ps, kecamatan: false, kelurahan: false }));
        return [];
      });
    setKecamatan(result);
    if (setVal) {
      callback && callback(result);
    }
  };

  const loadKelurahan = async (query, setVal = false, callback) => {
    setLoading(ps => ({ ...ps, kelurahan: true }));
    const result = await axios
      .get(`${apiUrl}/kelurahan?id_kecamatan=${query}`)
      .then(res => {
        setLoading(ps => ({ ...ps, kelurahan: false }));
        return res.data.kelurahan;
      })
      .catch(err => {
        setErrors(ps => ({ ...ps, kelurahan: err }));
        setLoading(ps => ({ ...ps, kelurahan: false }));
        return [];
      });

    setKelurahan(result);
    if (setVal) {
      callback && callback(result);
    }
  };

  useEffect(() => {
    loadProvinsi();
  }, []);

  useEffect(() => {
    loadKota(idProv);
  }, [idProv]);

  useEffect(() => {
    loadKecamatan(idKota);
  }, [idKota]);

  useEffect(() => {
    loadKelurahan(idKec);
  }, [idKec]);

  const indonesiaArea = {
    loading,
    errors,
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
