import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import UrlModal from "./urlModal";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Accordion,
  Card,
  Jumbotron,
  Spinner,
  Badge,
  Modal,
  Navbar,
  Nav,
  Form,
  FormControl
} from "react-bootstrap";

const App = () => {
  const [indexes, setIndexes] = useState([]);
  const [docs, setDocs] = useState([]);
  const [eUrl, setUrl] = useState("");
  useEffect(() => {
    getAllIndex(eUrl, setIndexes);
  }, [eUrl]);

  const getdocuments = index => {
    var sUrl = "http://" + eUrl + "/" + index + "/_search";
    console.log(sUrl);
    fetch(sUrl)
      .then(res => res.json())
      .then(json => {
        setDocs(json.hits.hits);
      });
  };

  const setUrlText = temptext => {
    setUrl(temptext);
  };

  const handleConnect = () => {
    console.log("connect clicked");
    return <UrlModal getData={setUrlText}></UrlModal>;
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand>ABB Edge</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link onClick={() => getAllIndex(eUrl, setIndexes)}>
            Refresh
          </Nav.Link>
          <Nav.Link href="#About">About</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
      <main role="main" className="flex-shrink-0">
        <p>
          <Container>
            <UrlModal getData={setUrlText}></UrlModal>
            <Row>
              <Col>
                <Jumbotron fluid>
                  <Container>
                    <h1>
                      <Spinner animation="grow" />
                      ABB Edge Application Insight
                      <Spinner animation="grow" />
                    </h1>
                    <p>
                      {" "}
                      Sample React Client to query data from Elasticsearch !!
                    </p>
                    <h2 onClick={handleConnect.bind(this)}>
                      Connected to - {eUrl}
                    </h2>
                  </Container>
                </Jumbotron>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>
                  <Badge variant="dark">
                    Indexes Available on Edge Services
                  </Badge>
                </h2>
              </Col>
              <Col>
                <h2>
                  <Badge variant="dark">Messages From Edge</Badge>
                </h2>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <ListGroup defaultActiveKey="#link1">
                  {indexes.map((item, key) => {
                    return (
                      <ListGroup.Item
                        variant="dark"
                        key={key}
                        action
                        onClick={() => {
                          getdocuments(item);
                        }}
                      >
                        {item.toString()}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Col>
              <Col xs={6}>
                <Accordion defaultActiveKey="0">
                  {docs.map((item, key) => {
                    return (
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={key}>
                          {item._source.MESSAGE ||
                            item._source.message ||
                            item._source.toString()}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={key}>
                          <Card.Body>{JSON.stringify(item)}</Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    );
                  })}
                </Accordion>
              </Col>
            </Row>
          </Container>
        </p>
      </main>
      <Navbar bg="dark" variant="dark" fixed="bottom">
        <Navbar.Text>© ABB Sample React Client</Navbar.Text>
      </Navbar>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

function getAllIndex(eUrl, setIndexes) {
  fetch("http://" + eUrl + "/_aliases?pretty=true")
    .then(res => res.json())
    .then(json => {
      setIndexes(Object.keys(json));
    });
  console.log("index called");
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
