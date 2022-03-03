import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import _ from "lodash/fp";
import Col from 'react-bootstrap/Col';
import { useForm } from 'react-hook-form'
import ApplicationService from '../service/ApplicationService';
import ApplicationUtils from "../service/ApplicationUtils";
import './Certificates.css'
import {withRouter, useHistory} from 'react-router-dom'

const DEFAULT_QUERY_PARAMS = '?offset=0&limit=10';
const CERTIFICATES_PATH = '/certificates';
const ERROR_ELEMENT = "#add-error p";

function EditModal(props) {
  const history = useHistory();
  const {register, handleSubmit, errors} = useForm();
  const [show, setShow] = React.useState(false);
  const [value, setValue] = React.useState('banan');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 

  const onSubmit = data => {
      ApplicationUtils.clearElementText(ERROR_ELEMENT);

      ApplicationService.updateCertificate(props.id, data.name, data.price, data.description, data.duration)
          .then(
              response=>{
                  history.push({pathname: CERTIFICATES_PATH, search: DEFAULT_QUERY_PARAMS});
                  handleClose();
                  props.refresh();
                  
          }).catch((error)=>{
              ApplicationUtils.addTextToElement(ERROR_ELEMENT, error.response.errorMessage);
      });
  };
  
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
         <Modal.Title>Edit certificate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div id="add-error"><p className="error"></p></div>
        <Form onSubmit={handleSubmit(onSubmit)}>
           <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder={props.name} name="name"  ref={register({ required: false, minLength:6, maxLength: 30})}/>
              {_.get("name.type", errors) === "minLength" && (<p className="error">Name is too short, min length = 6</p>)}
              {_.get("name.type", errors) === "maxLength" && (<p className="error">Name is too long, max length = 30</p>)}
           </Form.Group>
          <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder={props.desc} name="description" ref={register({ required: false, minLength:12, maxLength: 1000})} />
              {_.get("description.type", errors) === "minLength" && (<p className="error">Description is too short, min length = 12</p>)}
              {_.get("description.type", errors) === "maxLength" && (<p className="error">Description is too long, max length = 1000</p>)}
           </Form.Group>
           <Form.Group>
              <Form.Label>Duration</Form.Label>
              <Form.Control type="number" min="1" max="30" placeholder={props.dur} name="duration" ref={register({ required: false, minLength:1, maxLength: 30})} />
              {_.get("duration.type", errors) === "minLength" && (<p className="error">Duration is too short, min length = 1</p>)}
              {_.get("duration.type", errors) === "maxLength" && (<p className="error">Duration is too long, max length = 30</p>)}
           </Form.Group>
           <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" min="1" max="999" step="0.01" placeholder={props.price} name="price" ref={register({ required: false, minLength:1, maxLength: 999})} />
              {_.get("price.type", errors) === "minLength" && (<p className="error">Price is too short, min length = 1</p>)}
              {_.get("price.type", errors) === "maxLength" && (<p className="error">Price is too long, max length 999</p>)}
           </Form.Group>
           <Button variant="primary" type="submit">Save</Button>
           <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          

        </Modal.Footer> */}
      </Modal>
    </>
  );
  }

class EditButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data, refreshFunction } = this.props;

        return (
          <EditModal name={data.dataItem.name} desc={data.dataItem.description} price={data.dataItem.price} dur={data.dataItem.duration} id={data.dataItem.id} refresh={refreshFunction}/>
        );
    };
}

export default EditButton