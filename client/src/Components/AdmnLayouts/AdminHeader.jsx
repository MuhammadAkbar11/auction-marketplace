import React from "react";
import { List } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import { authAdminLogoutAuction } from "../../actions/admin/auth.actions";

const AdminHeader = ({ toggle }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { adminInfo } = useSelector(state => state.adminAuth);
  // const handleLogout =
  return (
    <header className="adm-header">
      <div className="adm--header adm--header-left">
        <a href="/#" onClick={toggle} className=" text-primary">
          <List size={30} />
        </a>
      </div>
      <div className="adm--header adm--header-main">
        <p />
      </div>
      <div className="adm--header adm--header-right">
        <div className="d-flex align-items-end flex-nowrap flex-row">
          <Dropdown>
            <Dropdown.Toggle
              className="adm--header-usermenu pr-0"
              variant="link"
              id="dropdown-basic"
              // as=a
            >
              Hi, {adminInfo?.username}
            </Dropdown.Toggle>

            <Dropdown.Menu className=" shadow-sm  ">
              <Dropdown.Item
                className=" d-flex align-items-center pointer-event  "
                as={Link}
                to="/administrator/dashboard"
              >
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item
                className=" d-flex align-items-center  "
                as={Link}
                to="/administrator/profile"
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                eventKey="#/"
                className=" d-flex align-items-center  text-dark"
                onClick={() => dispatch(authAdminLogoutAuction(history))}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
