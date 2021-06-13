import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { ListGroup, ListGroupItem, Nav } from "react-bootstrap";
import { CaretRight, CaretDown } from "phosphor-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const menuVariants = {
  open: custom => ({
    height: custom,
    transition: {
      type: "inherit",

      duration: 0.4,
      when: "beforeChildren",
    },
  }),
  closed: custom => ({
    height: custom,
    transition: {
      type: "inherit",
      duration: 0.4,
      when: "beforeChildren",
    },
  }),
  exit: custom => ({
    height: custom,
  }),
};

const submenuVariants = {
  open: {
    // height: "auto",
    opacity: 1,
    overflow: "visible",
  },
  closed: {
    // height: 0,
    overflow: "hidden",
    opacity: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 1,
    },
  },
};

const ListGroupItemDropdown = ({ menu, url, submenu }) => {
  const [showSubmenu, setShowSubmenu] = React.useState(false);
  const toggleRef = React.useRef(null);
  const submenuRef = React.useRef(null);

  const toggle = e => {
    e.preventDefault();
    setShowSubmenu(ps => {
      return ps ? false : true;
    });
  };

  React.useLayoutEffect(() => {
    setShowSubmenu(false);
  }, []);

  // console.log(toggleRef);
  const currentHeight =
    (showSubmenu ? toggleRef.current + submenuRef.current : toggleRef.current)
      ?.scrollHeight || "auto";

  return (
    <motion.div
      className=" border-0"
      initial={false}
      variants={menuVariants}
      custom={currentHeight}
      animate={showSubmenu ? "open" : "closed"}
      exit="exit"
    >
      <ListGroupItem
        ref={toggleRef}
        style={{
          cursor: "pointer",
        }}
        className=" d-flex align-items-center"
        onClick={toggle}
      >
        {menu}
        {!showSubmenu ? (
          <CaretRight weight="bold" className="ml-auto" />
        ) : (
          <CaretDown weight="bold" className="ml-auto" />
        )}
      </ListGroupItem>
      <AnimatePresence>
        {showSubmenu && (
          <Nav
            as={motion.nav}
            initial={false}
            variants={submenuVariants}
            ref={submenuRef}
            className="flex-column border border-top-0 border-bottom-0 bg-light mx-0 pl-2  text-dark "
          >
            {submenu.map((item, index) => {
              const key = index;
              return (
                <LinkContainer key={key} to={item.url}>
                  <Nav.Link className="text-gray-500 font-weight-lighter ">
                    {item.name}
                  </Nav.Link>
                </LinkContainer>
              );
            })}
          </Nav>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

ListGroupItemDropdown.defaultProps = {
  url: "#/",
  submenu: [],
};

// ListGroupItemDropdown.propTypes = {};
export default ListGroupItemDropdown;
