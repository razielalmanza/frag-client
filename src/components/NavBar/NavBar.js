import React, { useState, useContext } from "react";

import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Collapse,
  Button,
} from "shards-react";
import iconFilmo from "../../assets/images/LogoFilmotecaBlanco.png";
import { Link } from "@reach/router";
import { Context } from "../../Context";

import {
  faFilm,
  faSearch,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NavBar = () => {
  const { isAuth } = useContext(Context);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const { removeAuth } = useContext(Context);

  const toggleNavbar = () => {
    setCollapseOpen(!collapseOpen);
  };

  const salir = () => {
    toggleNavbar();
    removeAuth();
  };

  return (
    <Navbar type="dark" theme="dark" expand="md">
      <NavbarBrand>
        <Link to="/" className="text-light">
          <img
            src={iconFilmo}
            width="auto"
            height="25"
            className="d-inline-block align-top mr-1"
            alt=""
          />{" "}
          Fragmentos
        </Link>
      </NavbarBrand>

      <NavbarToggler onClick={toggleNavbar} />
      {isAuth && (
        <Collapse open={collapseOpen} navbar>
          <Nav navbar className="ml-auto">
            <NavItem className="mt-1 mr-4">
              <Link to="/darAlta" className="text-light">
                <FontAwesomeIcon icon={faFilm} /> Dar de alta nuevo fragmento
              </Link>
            </NavItem>
            <NavItem className="mt-1 mr-4">
              <Link to="/buscador" className="text-light">
                {" "}
                <FontAwesomeIcon icon={faSearch} /> Busqueda Avanzada
              </Link>
            </NavItem>

            <NavItem>
              <Button size="sm" theme="light" onClick={salir}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Salir
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      )}
    </Navbar>
  );
};

export default NavBar;
