import React from "react";
import { ListGroup, Nav, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { List } from "phosphor-react";
import { useSelector } from "react-redux";
import ListGroupItemDropdown from "../UI/ListGroupItemDropdown";
import { Link } from "react-router-dom";

const UserSidebarMenu = () => {
  const { userSidebarMenu } = useSelector(state => state.menu);
  return (
    <>
      <ListGroup className="d-none d-md-block">
        {userSidebarMenu.map(item => {
          return (
            <LinkContainer key={item.id} to={item.url}>
              <ListGroup.Item action>{item.menu}</ListGroup.Item>
            </LinkContainer>
          );
        })}
      </ListGroup>
      <div className="d-md-none d-flex justify-content-end mb-3">
        <Dropdown menualign="right">
          <Dropdown.Toggle
            variant="link"
            className="ml-auto toggle-caret-0"
            id="user-menu-mobile"
          >
            <List size={25} />
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{ minWidth: 250 }}
            className="  py-0 mb-3 shadow border-0 "
          >
            {userSidebarMenu.map((item, idx) => {
              return (
                <React.Fragment key={item.id}>
                  <Dropdown.Item className="py-3" as={Link} to={item.url}>
                    {item.menu}
                  </Dropdown.Item>
                  {idx !== userSidebarMenu.length - 1 && (
                    <Dropdown.Divider className="my-0" />
                  )}
                </React.Fragment>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default UserSidebarMenu;
