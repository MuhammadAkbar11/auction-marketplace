import React from "react";
import { Alert, Button, Card, Table } from "react-bootstrap";
import { Info, PencilLine, Trash } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAuctionAction,
  getUserAuctionsActiveAction,
} from "../../actions/user.actions";
import { axiosConfigAuth } from "../../utils/axiosConfig";
import axios from "axios";
import Loader from "../UI/Loader";
import { Link } from "react-router-dom";

const UserActiveAuctionsTab = ({ isActive }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isActive) {
      dispatch(getUserAuctionsActiveAction());
    }
  }, [isActive]);

  const { userInfo } = useSelector(state => state.authUser);
  const userAuctionState = useSelector(state => state.userAuction);
  const allAuctions = userAuctionState?.active;

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState({
    show: false,
    type: "danger",
    message: "",
  });

  const handleCloseAuction = async id => {
    const config = axiosConfigAuth(userInfo.token);
    setLoading(true);
    try {
      const setClose = await axios.put(
        "/api/user/auction/close",
        { id_lelang: id },
        config
      );
      setMessage({
        show: true,
        type: "success",
        message: setClose?.data?.message,
      });
      dispatch(getUserAuctionsActiveAction());
      setLoading(false);
    } catch (error) {
      setMessage({ show: true, type: "danger", message: error.message });
      setLoading(false);
    }
  };

  return (
    <Card className="mt-4">
      <Card.Header className="bg-transparent pt-4 text-dark text-uppercase font-weight-bold">
        <Card.Title>Leleng Aktif</Card.Title>
        {message.show && (
          <div className="my-3 text-capitalize font-weight-normal">
            <Alert
              variant={message.type}
              onClose={() =>
                setMessage({ show: false, message: "", type: "danger" })
              }
              dismissible
            >
              {message.message}
            </Alert>
          </div>
        )}
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
            {!allAuctions ? (
              <tr>
                <td colSpan={7}>
                  <Alert variant="info" className="text-center">
                    <Info size={24} /> Belum ada lelang untuk saat ini.
                  </Alert>
                </td>
              </tr>
            ) : allAuctions?.loading ? (
              <tr>
                <td colSpan={7}>
                  <Loader size={20} />
                </td>
              </tr>
            ) : allAuctions.data?.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <Alert variant="info" className="text-center">
                    <Info size={24} /> Belum ada lelang untuk saat ini.
                  </Alert>
                </td>
              </tr>
            ) : (
              allAuctions?.data?.map(ac => {
                return (
                  <tr key={ac.id_lelang}>
                    <td>{ac.judul}</td>
                    <td className="text-nowrap">{ac.tgl_mulai}</td>
                    <td className="text-nowrap">{ac.tgl_selesai}</td>
                    <td>0</td>
                    <td>-</td>
                    <td>
                      <Link
                        className="btn btn-teal btn-sm"
                        to={`/akun/edit-lelang/${ac.id_lelang}?tab=active`}
                      >
                        <PencilLine size={18} />
                      </Link>
                    </td>
                    <td>
                      <Button variant="danger" size="sm">
                        <Trash size={18} />
                      </Button>
                    </td>
                    <td>
                      <Button
                        disabled={loading}
                        onClick={() => handleCloseAuction(ac.id_lelang)}
                        variant="primary"
                        size="sm"
                      >
                        Tutup
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
