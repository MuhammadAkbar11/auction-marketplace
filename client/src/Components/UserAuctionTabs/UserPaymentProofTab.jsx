import React from "react";
import { Alert, Button, Card, Table, Dropdown } from "react-bootstrap";
import { Info, PencilLine, Trash, SquaresFour } from "phosphor-react";
import Loader from "../UI/Loader";
import { Link } from "react-router-dom";

const UserPaymentProofTab = ({
  auctions,
  handleDelete,
  delLoading,
  handleClose,
  closeLoading,
}) => {
  let no = 1;

  return (
    <Card className="mt-4">
      <Card.Header className="bg-transparent pt-4 text-dark text-uppercase font-weight-bold">
        <Card.Title>Barang Terjual</Card.Title>
      </Card.Header>

      <Card.Body>
        <Table responsive>
          <thead>
            <tr className=" text-nowrap">
              <th>#</th>
              <th>Tanggal</th>
              <th>Id Transaksi</th>
              <th>Total</th>
              <th>Dari Rekening</th>
              <th>Ke Rekening</th>
              <th>Status</th>
              <th>Menu</th>
            </tr>
          </thead>
          <tbody>
            {!auctions ? (
              <tr>
                <td colSpan={8}>
                  <Alert variant="info" className="text-center">
                    <Info size={24} /> Belum ada lelang untuk saat ini.
                  </Alert>
                </td>
              </tr>
            ) : auctions?.loading ? (
              <tr>
                <td colSpan={8}>
                  <Loader size={20} />
                </td>
              </tr>
            ) : auctions.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <Alert variant="info" className="text-center">
                    <Info size={24} /> Belum ada lelang untuk saat ini.
                  </Alert>
                </td>
              </tr>
            ) : (
              auctions.map(ac => {
                return (
                  <tr key={ac?.invoice}>
                    <td>{no++}</td>
                    <td>{ac?.date}</td>
                    <td>{ac?.invoice}</td>
                    <td className="text-nowrap text-primary">
                      Rp. {ac?.total}
                    </td>
                    <td>
                      {ac?.from.name}
                      <br /> ({ac?.from.number} - {ac?.from.bank})
                    </td>
                    <td>{ac?.to.bank}</td>
                    <td>{ac?.status}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          size="sm"
                          variant="primary"
                          id="users-actions"
                          className="toggle-caret-0"
                        >
                          <SquaresFour size={20} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="py-0 border-0 shadow-sm">
                          <Dropdown.Item
                            as="button"
                            className=" py-2 text-capitalize"
                          >
                            <Trash weight="fill" size={20} />
                            <span className="ml-2">Hapus</span>
                          </Dropdown.Item>
                          <Dropdown.Item
                            as="button"
                            className=" py-2 text-capitalize"
                          >
                            <Info weight="fill" size={20} />
                            <span className="ml-2">Detail</span>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
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

UserPaymentProofTab.defaultProps = {
  auctions: [
    {
      date: "15/06/2021",
      invoice: "15062115",
      status: "Menuggu Konfirmasi",
      from: {
        name: "Unit",
        number: "0245656022020",
        bank: "MANDIRI",
      },
      to: { bank: "MANDIRI" },

      total: "900.000",
    },
  ],
};

export default UserPaymentProofTab;
