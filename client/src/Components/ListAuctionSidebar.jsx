import React from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "../Components/UI/Icons/Index";
import { Button, Form } from "react-bootstrap";

const ListAuctionSidebar = () => {
  return (
    <>
      <div className="sidebar-wrapper sidebar-wrapper-mrg-right">
        <div className="sidebar-widget mb40">
          <h4 className="sidebar-widget-title">Search </h4>
          <div className="sidebar-search">
            <Form className="sidebar-search-form" action="#">
              <Form.Control type="text" placeholder="Search here..." />
              <button>
                <MagnifyingGlassIcon size={20} />
              </button>
            </Form>
          </div>
        </div>
        <div className="sidebar-widget shop-sidebar-border mb35 pt40">
          <h4 className="sidebar-widget-title">Categories </h4>
          <div className="shop-catigory">
            <ul>
              <li>
                <Link to="shop.html">T-Shirt</Link>
              </li>
              <li>
                <Link to="shop.html">Shoes</Link>
              </li>
              <li>
                <Link to="shop.html">Clothing </Link>
              </li>
              <li>
                <Link to="shop.html">Women </Link>
              </li>
              <li>
                <Link to="shop.html">Baby Boy </Link>
              </li>
              <li>
                <Link to="shop.html">Accessories </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="sidebar-widget shop-sidebar-border mb40 pt40">
          <h4 className="sidebar-widget-title">Refine By </h4>
          <div className="sidebar-widget-list">
            <ul className="pl-0 list-unstyled ">
              <li>
                <div className="sidebar-widget-list-left">
                  <Form.Control type="checkbox" />{" "}
                  <Link to="#">
                    On Sale <span>4</span>{" "}
                  </Link>
                  <span className="checkmark" />
                </div>
              </li>
              <li>
                <div className="sidebar-widget-list-left">
                  <input type="checkbox" defaultValue />{" "}
                  <Link to="#">
                    New <span>5</span>
                  </Link>
                  <span className="checkmark" />
                </div>
              </li>
              <li>
                <div className="sidebar-widget-list-left">
                  <input type="checkbox" defaultValue />{" "}
                  <Link to="#">
                    In Stock <span>6</span>{" "}
                  </Link>
                  <span className="checkmark" />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="sidebar-widget shop-sidebar-border pt40">
          <h4 className="sidebar-widget-title">Popular Tags</h4>
          <div className="tag-wrap sidebar-widget-tag">
            <Link to="#">Clothing</Link>
            <Link to="#">Accessories</Link>
            <Link to="#">For Men</Link>
            <Link to="#">Women</Link>
            <Link to="#">Fashion</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListAuctionSidebar;
