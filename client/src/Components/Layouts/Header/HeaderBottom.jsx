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
import { useSelector } from "react-redux";

const HeaderBottom = () => {
  const { categories } = useSelector(state => state.categories);
  const spliceCategories = [...categories];
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
              <Dropdown.Menu className="border-0 pt-0 w-100 mainCategoriMenu shadow-sm ">
                <ListGroup className="border-0 text-dark font-weight-bolder mainCategoriList ">
                  {categories.map(item => {
                    return (
                      <ListGroup.Item
                        key={item.id_kategori}
                        className="mainCategoriListItem"
                      >
                        <Link to={`/kategori/${item.id_kategori}`}>
                          {item.kategori}
                        </Link>
                      </ListGroup.Item>
                    );
                  })}
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
                    placeholder="Search"
                    className="my-auto"
                  />
                </Form>
              </div>
              <div className="categoriSelect">
                <Form.Control as="select">
                  {spliceCategories.splice(0, 5).map(item => {
                    return (
                      <option key={item.id_kategori}>{item.kategori}</option>
                    );
                  })}
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
