import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Card, Table } from "react-bootstrap";
import { Info } from "phosphor-react";
import Loader from "../UI/Loader";
import { Link } from "react-router-dom";
import { getUserAuctionsCompleteAction } from "../../actions/user.actions";

const UserCompleteListAuctionTab = () => {
  const dispatch = useDispatch();

  const userAuctionState = useSelector(state => state.userAuction);

  const auctions = userAuctionState?.completeList;

  React.useEffect(() => {
    dispatch(getUserAuctionsCompleteAction());
  }, []);

  return (
    <Card className="mt-4">
      <Card.Header className="bg-transparent pt-4 text-dark text-uppercase font-weight-bold">
        <Card.Title>Lelang Selesai</Card.Title>
      </Card.Header>

      <Card.Body>
        <Table responsive>
          <thead>
            <tr className="text-nowrap">
              <th>Judul Lelang</th>
              <th>Dimulai</th>
              <th>Berakhir</th>
              <th>Total Bids</th>
              <th>Tawaran tertinggi</th>
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

export default UserCompleteListAuctionTab;
