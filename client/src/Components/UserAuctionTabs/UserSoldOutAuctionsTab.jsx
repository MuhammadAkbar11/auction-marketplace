import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Badge, Button, Card, Table } from "react-bootstrap";
import { Info, PencilLine, Trash, SquaresFour } from "phosphor-react";
import Loader from "../UI/Loader";
import { Link } from "react-router-dom";
import { getUserSoldItemsAction } from "../../actions/user.actions";

const UserSoldOutAuctionsTab = ({ isActive }) => {
  const dispatch = useDispatch();

  const userAuctionState = useSelector(state => state.userAuction);

  const auctions = userAuctionState?.soldItems;

  React.useEffect(() => {
    if (isActive) {
      dispatch(getUserSoldItemsAction());
    }
  }, [isActive]);

  let no = 1;

  let statusAction = (
    <Button variant="dark" className="text-nowrap" size="sm">
      Unknown status
    </Button>
  );

  return (
    <Card className="mt-4">
      <Card.Header className="bg-transparent pt-4 text-dark text-uppercase font-weight-bold">
        <Card.Title>Barang Terjual</Card.Title>
      </Card.Header>

      <Card.Body>
        <Table responsive>
          <thead>
            <tr className="text-nowrap">
              <th>#</th>
              <th>Judul Lelang</th>
              <th>Dimulai</th>
              <th>Berakhir</th>
              <th>Total Bids</th>
              <th>Tawaran tertinggi</th>
              <th>Status</th>
              {/* <th>Cek alamat</th> */}
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
                    <td>{no++}</td>
                    <td>
                      <Link to={`/item/${ac.id_lelang}`}>{ac.judul}</Link>
                    </td>
                    <td className="text-nowrap">{ac.tgl_mulai}</td>
                    <td className="text-nowrap">{ac.tgl_selesai}</td>
                    <td className="text-success">
                      {ac?.daftar_tawaran.length} Tawaran
                    </td>
                    <td className="  font-weight-normal text-black-50 ">
                      {ac?.daftar_tawaran.length !== 0 ? (
                        <>
                          <span className="text-primary">
                            Rp. {ac?.daftar_tawaran[0].nilai_tawaran}
                          </span>{" "}
                          <br />
                          (By {ac?.daftar_tawaran[0]?.member?.username})
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {(() => {
                        if (+ac.status_transaksi === 0) {
                          return (
                            <Button
                              size="sm"
                              variant="dark"
                              // disabled
                              className="text-nowrap cursor-default shadow-none "
                            >
                              Menunggu Konfirmasi pemenang
                            </Button>
                          );
                        }

                        if (+ac.status_transaksi === 1) {
                          return (
                            <Link
                              to={`/akun/lelang/konfirmasi-tagihan/${ac.id_transaksi}`}
                              className="text-nowrap btn btn-blue btn-sm"
                            >
                              Konfirmasi Tagihan
                            </Link>
                          );
                        }

                        if (+ac.status_transaksi === 2) {
                          return (
                            <Button
                              size="sm"
                              variant="warning"
                              // disabled
                              className="text-nowrap text-spacing-0 cursor-default shadow-none "
                            >
                              Menunggu pembayaran
                            </Button>
                          );
                        }

                        return (
                          <Button
                            variant="dark"
                            className="text-nowrap"
                            size="sm"
                          >
                            Unknown status
                          </Button>
                        );
                      })()}
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

UserSoldOutAuctionsTab.defaultProps = {
  auctions: [],
};

export default UserSoldOutAuctionsTab;
