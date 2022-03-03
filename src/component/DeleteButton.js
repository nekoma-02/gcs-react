import React from 'react'
import ApplicationUtils from '../service/ApplicationUtils';
import ApplicationService from '../service/ApplicationService';
import {confirmAlert} from 'react-confirm-alert';
import Button from 'react-bootstrap/Button';

class DeleteButton extends React.Component{
    constructor(props) {
        super(props);
        this.deleteCertificateById = this.deleteCertificateById.bind(this);
        this.confirmCertificateDeleting  = this.confirmCertificateDeleting.bind(this);
    }

    deleteCertificateById(id, refreshCertificates){
        ApplicationService.deleteCertificateById(id)
            .then(
                response => {
                    refreshCertificates();
                }
            )
    }

    confirmCertificateDeleting = (id, refreshFunction) => {
        confirmAlert({
            message: 'Do you really want to delete this certificate? with id = ' + id + '',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteCertificateById(id, refreshFunction)
                },
                {label: 'No'}
            ]
        });
    };

    render() {
        const {refreshCertificates, id} = this.props;

        return(
            <Button variant="danger" onClick={()=>this.confirmCertificateDeleting(id, refreshCertificates)}>Delete</Button>
        );
    }
}

export default DeleteButton