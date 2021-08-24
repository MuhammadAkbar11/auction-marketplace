import React from "react";
import { Alert, Card, Table } from "react-bootstrap";
import { Info } from "phosphor-react";
import { useSelector, useDispatch } from "react-redux";
import { getUserBidsAction } from "../../actions/user.purchase.actions";
import { Link } from "react-router-dom";
import Loader from "../UI/Loader";

const UserMyBidsTab = () => {
  const dispatch = useDispatch();

  const userMyBidsState = useSelector(state => state.userMyBids);
  const { userInfo } = useSelector(state => state.authUser);

  const auctions = userMyBidsState?.data;
  const loading = userMyBidsState?.loading;

  React.useEffect(() => {
    dispatch(getUserBidsAction());
  }, [dispatch]);

  return (
    <div>
      <Card className="mt-4">
        <Card.Header className="bg-transparent pt-4 text-dark text-uppercase font-weight-bold">
          <Card.Title>Penawaran Saya</Card.Title>
        </Card.Header>

        <Card.Body>
          <Table responsive bordered size="sm">
            <thead>
              <tr className="text-nowrap">
                <th>Lelang</th>
                <th>Penawaran anda</th>
                <th>Bid Tertinggi</th>
                <th>Berakhir dalam</th>
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
              ) : loading ? (
                <tr>
                  <td colSpan={7}>
                    <Loader size={20} />
                  </td>
                </tr>
              ) : auctions?.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <Alert variant="info" className="text-center">
                      <Info size={24} /> Belum ada tawaran saat ini.
                    </Alert>
                  </td>
                </tr>
              ) : (
                auctions.map(item => {
                  return (
                    <tr key={item.id_lelang}>
                      <td>
                        <Link to={`/item/${item.id_lelang}`}>{item.judul}</Link>
                      </td>
                      <td className="text-nowrap">
                        Rp. {item?.tawaran_saya[0]?.nilai_tawaran}
                      </td>
                      <td className="  font-weight-normal text-black-50 ">
                        {item?.tawaran.length !== 0 ? (
                          <>
                            <span
                              className={`${
                                userInfo.id_member ===
                                item?.tawaran[0]?.id_member
                                  ? "text-success"
                                  : "text-primary "
                              } `}
                            >
                              Rp. {item?.tawaran[0].nilai_tawaran}
                            </span>{" "}
                            <br />
                            <span>
                              {" "}
                              (
                              {userInfo.id_member ===
                              item?.tawaran[0]?.id_member
                                ? "Saya"
                                : "By " + item?.tawaran[0]?.member?.username}
                              )
                            </span>
                          </>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className={`text-dark  `}>{item?.tgl_selesai}</td>
                    </tr>
                  );
                })
              )}
              {/* <tr>
                <td colSpan={4}>
                  <Alert variant="info" className="text-center">
                    <Info size={24} /> Belum ada tawaran untuk saat ini.
                  </Alert>
                </td>
              </tr> */}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserMyBidsTab;
