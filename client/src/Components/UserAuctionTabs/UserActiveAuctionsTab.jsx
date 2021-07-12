import React from "react";
import { Alert, Button, Card, Table } from "react-bootstrap";
import { Info, PencilLine, Trash } from "phosphor-react";
import Loader from "../UI/Loader";
import { Link } from "react-router-dom";

const UserActiveAuctionsTab = ({
  auctions,
  handleDelete,
  delLoading,
  handleClose,
  closeLoading,
}) => {
  return (
    <Card className="mt-4">
      <Card.Header className="bg-transparent pt-4 text-dark text-uppercase font-weight-bold">
        <Card.Title>Lelang Aktif</Card.Title>
      </Card.Header>

      <Card.Body>
        <Table responsive>
          <thead>
            <tr className="text-nowrap">
              <th>Judul Lelang</th>
              <th>Dimulai</th>
              <th>Berakhir</th>
              <th>Total Bids</th>
              <th>Penawaran saat ini</th>
              <th>Edit</th>
              <th>Hapus</th>
              <th>Tutup</th>
            </tr>
          </thead>
          <tbody>
            {!auctions ? (
              <tr>
                <td colSpan={7}>
                  <Alert variant="info" className="text-center">
                    <Info size={24} /> Belum ada lelang untuk saat ini.
                  </Alert>
                </td>
              </tr>
            ) : auctions?.loading ? (
              <tr>
                <td colSpan={7}>
                  <Loader size={20} />
                </td>
              </tr>
            ) : auctions.data?.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <Alert variant="info" className="text-center">
                    <Info size={24} /> Belum ada lelang untuk saat ini.
                  </Alert>
                </td>
              </tr>
            ) : (
              auctions?.data?.map(ac => {
                return (
                  <tr key={ac.id_lelang}>
                    <td>
                      <Link to={`/item/${ac.id_lelang}`}>{ac.judul}</Link>
                    </td>
                    <td className="text-nowrap">{ac.tgl_mulai}</td>
                    <td className="text-nowrap">{ac.tgl_selesai}</td>
                    <td className="text-success">
                      {ac?.tawaran.length} Tawaran
                    </td>
                    <td className="  font-weight-normal text-black-50 ">
                      {ac?.tawaran.length !== 0 ? (
                        <>
                          <span className="text-primary">
                            Rp. {ac?.tawaran[0].nilai_tawaran}
                          </span>{" "}
                          <br />
                          (By {ac?.tawaran[0]?.member?.username})
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {ac?.tawaran.length === 0 ? (
                        <Link
                          className="btn btn-teal btn-sm"
                          to={`/akun/edit-lelang/${ac.id_lelang}?tab=active`}
                        >
                          <PencilLine size={18} />
                        </Link>
                      ) : (
                        <div className="text-primary text-center">
                          <Info size={25} />
                        </div>
                      )}
                    </td>
                    <td>
                      {ac?.tawaran.length === 0 ? (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(ac.id_lelang)}
                          disabled={delLoading}
                        >
                          {delLoading ? (
                            <Loader size={18} variant="light" />
                          ) : (
                            <Trash size={18} />
                          )}
                        </Button>
                      ) : (
                        <div className="text-primary text-center">
                          <Info size={25} />
                        </div>
                      )}
                    </td>
                    <td>
                      <Button
                        disabled={closeLoading}
                        onClick={() => handleClose(ac.id_lelang)}
                        variant="primary"
                        size="sm"
                      >
                        {closeLoading ? (
                          <Loader variant="light" size={18} />
                        ) : (
                          "Tutup"
                        )}
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default UserActiveAuctionsTab;
