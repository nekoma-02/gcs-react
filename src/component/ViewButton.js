import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css";

function ViewModal(props) {
    const [show, setShow] = React.useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="info" onClick={handleShow}>
          view
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
           <Modal.Title>View certificate</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
             <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={props.name} />
             </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={props.desc} />
             </Form.Group>
             <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" value={props.price} />
             </Form.Group>
             <Form.Group>
                <Form.Label>Duration</Form.Label>
                <Form.Control type="text" value={props.dur} />
             </Form.Group>
             

          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }

class ViewButton extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        const { data, tagList } = this.props;

        return (
          <ViewModal name={data.dataItem.name} tags={tagList} desc={data.dataItem.description} price={data.dataItem.price} dur={data.dataItem.duration}/>
        );
    };
}

export default ViewButton