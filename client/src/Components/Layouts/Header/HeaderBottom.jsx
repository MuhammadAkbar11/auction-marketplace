import React from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Dropdown,
  ListGroup,
  Form,
} from "react-bootstrap";
import { ListIcon } from "../../UI/Icons/Index";
const HeaderBottom = () => {
  return (
    <div className="headerBottom">
      <Container fluid className="px-md-8">
        <Row className="align-items-center">
          <Col lg={3}>
            <Dropdown className="mainCategori">
              <Dropdown.Toggle
                variant="primary"
                id="main-categori-dropdown"
                className="text-left d-flex justify-content-between align-items-center"
                block
              >
                <ListIcon size="27" />
                <span>All Kategori</span>
              </Dropdown.Toggle>{" "}
              <Dropdown.Menu className="border-0 pt-0 w-100 mainCategoriMenu ">
                <ListGroup className="border-0 text-dark font-weight-bolder mainCategoriList ">
                  <ListGroup.Item className="mainCategoriListItem">
                    <Link to="/kat1">Kategori 1</Link>
                  </ListGroup.Item>
                  <ListGroup.Item className="mainCategoriListItem">
                    <Link to="/kat2">Kategori 2</Link>
                  </ListGroup.Item>
                  <ListGroup.Item className="mainCategoriListItem">
                    <Link to="/kat3">Kategori 4</Link>
                  </ListGroup.Item>
                </ListGroup>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col lg={6} className="">
            <div className=" categoriSearch d-flex align-items-center pr-2">
              <div className="categoriSearchForm">
                <Form action="#" className="h-100  h-auto">
                  <Form.Control
                    type="text"
                    placeholder="search"
                    className="my-auto"
                  />
                </Form>
              </div>
              <div className="categoriSelect">
                <Form.Control as="select">
                  <option>All Categories </option>
                  <option>Clothing </option>
                  <option>T-Shirt</option>
                  <option>Shoes</option>
                  <option>Jeans</option>
                </Form.Control>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderBottom;
