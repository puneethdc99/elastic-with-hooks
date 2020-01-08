import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const urlModal = React.memo(props => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    props.getData(mValue);
    setShow(false);
  };
  const handleChange = value => {
    mValue = value;
  };
  var mValue = "";
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Elastic Node</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" onChange={e => handleChange(e.target.value)} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShow(false);
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default urlModal;
