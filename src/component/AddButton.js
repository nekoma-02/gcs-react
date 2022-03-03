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


function AddModal(props) {

    const history = useHistory();
    const {register, handleSubmit, errors} = useForm();
    const [show, setShow] = React.useState(false);
    const [value, setValue] = React.useState('banan');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    const tagList = props.tags.map((element, index) => <option value={element} key={index}>{element}</option>);


    const _handleChange = (event) => {
    setValue(event.target.value);
    let tagGroup = document.getElementById('selected-tag');
    let tag = document.createElement('p');
    tag.appendChild(document.createTextNode({value}));
    tagGroup.appendChild(tag);

  }

    const onSubmit = data => {
        ApplicationUtils.clearElementText(ERROR_ELEMENT);

        ApplicationService.addCertificate(data.name, data.price, data.description, data.duration)
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
        <Button id='add-btn' variant="info" onClick={handleShow}>
          Add new
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
           <Modal.Title>Add certificate</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div id="add-error"><p className="error"></p></div>
          <Form onSubmit={handleSubmit(onSubmit)}>
             <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" name="name" ref={register({ required: true, minLength:6, maxLength: 30})}/>
                {_.get("name.type", errors) === "required" && (<p className="error">This field is required</p>)}
                {_.get("name.type", errors) === "minLength" && (<p className="error">Name is too short, min length = 6</p>)}
                {_.get("name.type", errors) === "maxLength" && (<p className="error">Name is too long, max length = 30</p>)}
             </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" ref={register({ required: true, minLength:12, maxLength: 1000})} />
                {_.get("description.type", errors) === "required" && (<p className="error">This field is required</p>)}
                {_.get("description.type", errors) === "minLength" && (<p className="error">Description is too short, min length = 12</p>)}
                {_.get("description.type", errors) === "maxLength" && (<p className="error">Description is too long, max length = 1000</p>)}
             </Form.Group>
             <Form.Group>
                <Form.Label>Duration</Form.Label>
                <Form.Control type="number" min="1" max="30" placeholder="Enter Duration" name="duration" ref={register({ required: true, minLength:1, maxLength: 30})} />
                {_.get("duration.type", errors) === "required" && (<p className="error">This field is required</p>)}
                {_.get("duration.type", errors) === "minLength" && (<p className="error">Duration is too short, min length = 1</p>)}
                {_.get("duration.type", errors) === "maxLength" && (<p className="error">Duration is too long, max length = 30</p>)}
             </Form.Group>
             <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" min="1" max="999" step="0.01" placeholder="Enter Price" name="price" ref={register({ required: true, minLength:1, maxLength: 999})} />
                {_.get("price.type", errors) === "required" && (<p className="error">This field is required</p>)}
                {_.get("price.type", errors) === "minLength" && (<p className="error">Price is too short, min length = 1</p>)}
                {_.get("price.type", errors) === "maxLength" && (<p className="error">Price is too long, max length 999</p>)}
             </Form.Group>
             <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Tags</Form.Label>
                <Form.Control as="select" onChange={event=>_handleChange(event)} value={value}>
                  {tagList}
                </Form.Control>
             </Form.Group>
             <Form.Group id="selected-tag"></Form.Group>
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

class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.getAllTags = this.getAllTags.bind(this);
        this.state = {
            tags: [],
            error: '',
      
        };
        
    }
    
    componentDidMount() {
      this.getAllTags();
    }

    getAllTags() {
        ApplicationService.getAllTags()
        .then(
            response => {
                this.setState({ tags: response.data});
            }
        ).catch((error)=>{
            this.setState({error:error.response.toString});
        })
    };

     createOptionTags() {
      
      let tagList = this.state.tags;
      let tagNames = [];
      tagList.forEach(element => {
          tagNames.push(element.name);
          console.log(element.name);
      });
      return tagNames;
    }


    render() {
        const { refreshFunction } = this.props;
        return (
           <AddModal tags={this.createOptionTags()} refresh={refreshFunction}/>
        );
    };
}

export default AddButton