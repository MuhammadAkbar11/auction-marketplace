import React from "react";
import { ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import ListGroupItemDropdown from "../UI/ListGroupItemDropdown";

const UserSidebarMenu = () => {
  const { userSidebarMenu } = useSelector(state => state.menu);
  return (
    <>
      <ListGroup>
        {userSidebarMenu.map(item => {
          return (
            <LinkContainer key={item.id} to={item.url}>
              <ListGroup.Item action>{item.menu}</ListGroup.Item>
            </LinkContainer>
          );
        })}
      </ListGroup>
    </>
  );
};

export default UserSidebarMenu;
