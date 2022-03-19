import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { X } from "phosphor-react";
import { Nav } from "react-bootstrap";
const AdminSidebar = ({ show, handleClose }) => {
  return (
    <aside className={`adm-sidebar ${show && "show"}`}>
      <div className="adm--sidebar-top">
        <div className="adm-logo">
          <p className="adm-logo-text text-primary">Baebid</p>
        </div>
      </div>
      <div className="adm--sidebar-nav">
        <Nav className="flex-column" defaultActiveKey="/dashboard">
          <LinkContainer to="/administrator/dashboard">
            <Nav.Link>
              <span>Dashboard</span>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/administrator/kategori">
            <Nav.Link>
              <span>Kategori</span>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/administrator/anggota">
            <Nav.Link>
              <span>Anggota</span>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/administrator/lelang">
            <Nav.Link>
              <span>Lelang</span>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/administrator/transaksi">
            <Nav.Link>
              <span>Transaksi</span>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/administrator/invoice">
            <Nav.Link>
              <span>Invoice</span>
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </div>
      <div className="adm--sidebar-bottom ">
        <a
          href="#/"
          onClick={handleClose}
          className="mx-auto mt-auto mb-3 ml-n3  adm-toggle adm--sidebar-close text-light"
        >
          <X size={30} />
        </a>
      </div>
    </aside>
  );
};

export default AdminSidebar;
