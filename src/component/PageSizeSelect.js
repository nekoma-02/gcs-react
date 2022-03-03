import React from 'react'
import ApplicationUtils from "../service/ApplicationUtils";

const LIMIT = 'limit';

class PageSizeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.setActiveLimit = this.setActiveLimit.bind(this);
        this.state = {
            activeLimit: ApplicationUtils.getQueryParam(LIMIT)
        };
    }

    componentDidMount() {
        window.addEventListener('load', this.setActiveLimit);
    }

    setActiveLimit(){
        document.getElementById('page-size').value = this.state.activeLimit;
    }

    render() {
        const {changeFunction} = this.props
        return (
            <select onChange={changeFunction} name='size' id='page-size'>
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='50'>50</option>
            </select>
        );
    }
}

export default PageSizeSelect
