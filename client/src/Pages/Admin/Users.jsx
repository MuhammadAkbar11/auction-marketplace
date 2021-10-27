import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  Container,
  Card,
  Row,
  Col,
  Breadcrumb,
  Table,
  Dropdown,
  Alert,
} from "react-bootstrap";
import { Trash, Info, SquaresFour } from "phosphor-react";
import AdminLayout from "../../Components/AdmnLayouts/AdminLayout";
import { adminGetMembersAction } from "../../actions/admin/member.actions";
import Loader from "../../Components/UI/Loader";

const Users = () => {
  const dispatch = useDispatch();

  const { members, loading } = useSelector(state => state.adminListMember);

  React.useEffect(() => {
    dispatch(adminGetMembersAction());
  }, [dispatch]);

  let no = 1;

  return (
    <AdminLayout>
      <Container fluid className=" ">
        <h3 className="text-dark  font-weight-normal ">Anggota</h3>
        <Breadcrumb className="bg-white admin-breadcrumb shadow-sm">
          <LinkContainer to="/administrator/dashboard">
            <Breadcrumb.Item className="bg-white">Dashboard</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>Anggota</Breadcrumb.Item>
        </Breadcrumb>
        <Row noGutters className="pt-4 w-100">
          <Col sm={12} md={12}>
            <Card className="pt-2  bg-white border-0 shadow-sm  ">
              <Card.Body>
                <Table hover responsive size="sm">
                  <thead className=" text-nowrap ">
                    <tr>
                      <th>#</th>
                      <th>Id member</th>
                      <th>Nama</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Total Lelang</th>
                      <th>Menu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="text-center">
                          <Loader size={20} />
                        </td>
                      </tr>
                    ) : members?.length !== 0 ? (
                      members.map(mbr => {
                        return (
                          <tr key={mbr?.id_member}>
                            <td>{no++}</td>
                            <td>{mbr?.id_member}</td>
                            <td>{mbr?.nama}</td>
                            <td>{mbr?.username}</td>
                            <td>{mbr?.email}</td>
                            <td>{mbr?.total_lelang?.count}</td>
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
                    ) : (
                      <td colSpan={8}>
                        <Alert variant="info" className="text-center">
                          Belum ada member yang terdaftar
                        </Alert>
                      </td>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default Users;
