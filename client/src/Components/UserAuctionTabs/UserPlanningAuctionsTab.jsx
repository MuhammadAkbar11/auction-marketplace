import React from "react";
import { Alert, Button, Card, Table } from "react-bootstrap";
import { Info, PencilLine, Trash } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuctionAction } from "../../actions/user.actions";
import { axiosConfigAuth } from "../../utils/axiosConfig";
import axios from "axios";
import Loader from "../UI/Loader";
import { Link } from "react-router-dom";

const UserPlanningAuctionsTab = ({ handleDelete, delLoading, auctions }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.authUser);

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState({
    show: false,
    type: "danger",
    message: "",
  });

  const handleStartAuction = async id => {
    const config = axiosConfigAuth(userInfo.token);
    setLoading(true);
    try {
      const setStart = await axios.put(
        "/api/user/auction/start",
        { id_lelang: id },
        config
      );
      setMessage({
        show: true,
        type: "success",
        message: setStart?.data?.message,
      });
      dispatch(getUserAuctionAction());
      setLoading(false);
    } catch (error) {
      setMessage({ show: true, type: "danger", message: error.message });
      setLoading(false);
    }
  };

  return (
    <Card className="mt-4">
      <Card.Header className="bg-transparent pt-4 text-dark text-uppercase font-weight-bold">
        <Card.Title>Leleng Direncanakan</Card.Title>
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
              <th>Waktu Mulai</th>
              <th>Waktu Berakhir</th>
              <th>Edit</th>
              <th>Hapus</th>
              <th>Mulai Sekarang</th>
            </tr>
          </thead>
          <tbody>
            {auctions?.loading ? (
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
              auctions.data?.map(ac => {
                return (
                  <tr key={ac.id_lelang}>
                    <td>
                      <Link to={`/item/${ac.id_lelang}`}>{ac.judul}</Link>
                    </td>
                    <td className="text-nowrap">{ac.tgl_mulai}</td>
                    <td className="text-nowrap">{ac.tgl_selesai}</td>
                    <td>
                      <Link
                        className="btn btn-teal btn-sm"
                        to={`/akun/edit-lelang/${ac.id_lelang}`}
                      >
                        <PencilLine size={18} />
                      </Link>
                    </td>
                    <td>
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
                    </td>
                    <td>
                      <Button
                        disabled={loading}
                        onClick={() => handleStartAuction(ac.id_lelang)}
                        variant="primary"
                        size="sm"
                      >
                        Mulai
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
            {}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default UserPlanningAuctionsTab;
