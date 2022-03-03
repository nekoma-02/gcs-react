import React from 'react'
import ReactPaginate from 'react-paginate';
import {withRouter} from 'react-router-dom';
import SearchField from 'react-search-field';
import ApplicationService from '../service/ApplicationService';
import Table from './Table';
import Error from './Error';
import PageSizeSelect from './PageSizeSelect';
import LogoutButton from './LogoutButton';
import AddButton from './AddButton';
import ApplicationUtils from '../service/ApplicationUtils';
import './Certificates.css'
import 'react-confirm-alert/src/react-confirm-alert.css';

const PATH = '/certificates';
const LIMIT = 'limit';
const OFFSET = 'offset';
const DEFAULT_QUERY = 'offset=0&limit=10';

class Certificates extends React.Component {
    constructor(props) {
        super(props);
        this.changePageSize = this.changePageSize.bind(this);
        this.refreshCertificates = this.refreshCertificates.bind(this);
        this.findCertificates  = this.findCertificates.bind(this);
        this.detectEmptySearchLine  = this.detectEmptySearchLine.bind(this);
        this.state = {
            certificates: [],
            error: '',
            queryParams: ApplicationUtils.getQueryParams().toString()
        };
    }

    componentDidMount() {
        this.refreshCertificates();
    }

    refreshCertificates(queryParams = this.state.queryParams) {
        ApplicationService.getCertificates(queryParams)
            .then(
                response => {
                    this.setState({ certificates: response.data});
                }
            ).catch((error)=>{
                this.setState({error: error.response.data.errorMessage});
            })
    }

    changePage({selected: selectedPage}) {
        ApplicationUtils.setQueryParam(OFFSET, selectedPage, PATH, true);
        this.state.queryParams = ApplicationUtils.getQueryParams();
        this.refreshCertificates();
    }

    changePageSize(event){
        let value  = event.target.value;

        ApplicationUtils.setQueryParam(LIMIT, value, PATH, true);
        this.state.queryParams = ApplicationUtils.getQueryParams();
        this.refreshCertificates();
    };

    findCertificates(values){
        ApplicationUtils.clearSearchQuery(PATH);
        let query = ApplicationUtils.createSearchQuery(values);
 
        ApplicationService.findCertificate(query)
            .then(
                response => {
                    this.setState({certificates: response.data});
                }
            ).catch((error) => {
            this.setState({error: error.response.data.errorMessage});
        })
    }

    detectEmptySearchLine(value){
        if(!value){
            ApplicationUtils.clearSearchQuery(PATH);
            this.refreshCertificates(DEFAULT_QUERY);
        }
    }

    render() {
        const errorMessage = this.state.error;
        let error;
        let certificateLength = this.state.certificates.length;

        if(errorMessage && errorMessage.length !== 0){
            error = <Error data={errorMessage}/>;
        }

        return (
            <div>
                <AddButton refreshFunction={this.refreshCertificates}/>
                <LogoutButton/>
                {error}
                <SearchField
                    placeholder='Search...'
                    classNames='search-field'
                    onSearchClick={this.findCertificates}
                    onChange={this.detectEmptySearchLine}
                />
                <Table data={this.state.certificates}
                       refreshFunction={this.refreshCertificates}
                />
                <div>
                <ReactPaginate
                    pageCount={50}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={5}
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    onPageChange={event=>this.changePage(event)}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
                <PageSizeSelect changeFunction={this.changePageSize}/>
                </div>
            </div>
        );
    }
}

export default withRouter(Certificates)
