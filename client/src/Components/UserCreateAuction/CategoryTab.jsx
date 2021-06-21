import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { userAddAuctionCategory } from "../../actions/user.actions";
import { getCategoriesAction } from "../../actions/categories.actions";
import Loader from "../UI/Loader";
import CreateAuctionSteps from "./CreateAuctionSteps";

const CategoryTab = () => {
  const history = useHistory();
  const createAuctionState = useSelector(state => state.userCreateAuction);
  const { categories, loading } = useSelector(state => state.categories);
  const dispatch = useDispatch();

  const [searchTerms, setSearchTerms] = React.useState("");
  const [selected, setSelected] = React.useState(createAuctionState?.category);
  // const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    dispatch(getCategoriesAction());
    // setCategories(categoriesState);
  }, []);

  const searchHandler = e => {
    const value = e.target.value;
    setSearchTerms(value);
    const oldCategories = categories;
    // if (value !== "") {
    //   const filterCategories = categoriesState.filter(cat => {
    //     const find = cat.name.toLowerCase().includes(value.toLowerCase());
    //     if (find) {
    //       return cat;
    //     }
    //   });

    //   setCategories(filterCategories);
    // } else {
    //   setCategories(oldCategories);
    // }
  };

  const selectCategoryHandler = e => {
    e.preventDefault();
    // console.log(e);
    const idCat = e.target.id;
    setSelected(idCat);
  };

  const saveCategory = () => {
    dispatch(userAddAuctionCategory(selected));
    history.push("/akun/buat-lelang?tab=deskripsi");
  };

  console.log(selected);

  return (
    <Container className="px-md-8 pb-8">
      <Row>
        <Col xs={12}>
          <CreateAuctionSteps step1 currentStep="step1" />
        </Col>
      </Row>
      <Row>
        <Col md={8} className="mx-auto">
          <div className="d-flex justify-content-end mb-3 ">
            {" "}
            <Button
              onClick={saveCategory}
              className="ml-auto"
              disabled={selected === ""}
            >
              Next
            </Button>
          </div>

          <Card body className="px-3 py-2">
            <p className="mt-2">
              Masukkan kategori yang sesuai dengan barang yang ingin Anda jual!
            </p>
            <Form.Control
              placeholder="Ketik Kategori"
              onChange={searchHandler}
              value={searchTerms}
            />
            <br />
            {loading ? (
              <Loader size={20} variant="primary" />
            ) : (
              <ListGroup>
                {searchTerms !== ""
                  ? categories
                      .filter(cat => {
                        const find = cat.kategori
                          .toLowerCase()
                          .includes(searchTerms.toLowerCase());
                        if (find) {
                          return cat;
                        }
                      })
                      .map(cat => {
                        return (
                          <ListGroup.Item
                            onClick={selectCategoryHandler}
                            key={cat.id_kategori}
                            id={cat.id_kategori}
                            action
                            className="my-0 font-weight-normal "
                            active={+cat.id_kategori === +selected}
                          >
                            {cat.kategori}
                          </ListGroup.Item>
                        );
                      })
                  : categories.map(cat => {
                      return (
                        <ListGroup.Item
                          onClick={selectCategoryHandler}
                          key={cat.id_kategori}
                          id={cat.id_kategori}
                          action
                          className="my-0 font-weight-normal "
                          active={+cat.id_kategori === +selected}
                        >
                          {cat.kategori}
                        </ListGroup.Item>
                      );
                    })}
              </ListGroup>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryTab;
