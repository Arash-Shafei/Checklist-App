import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              Checkr <span>(Click to bring back to Launch Page)</span>
            </Navbar.Brand>
          </LinkContainer>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
