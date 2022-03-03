import React from 'react'
import ApplicationUtils from "../service/ApplicationUtils";
import DeleteButton from './DeleteButton';
import ViewButton from './ViewButton';
import EditButton from './EditButton';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';

class Table extends React.Component {
    state = {
        sort: [
            {field: 'createDate', dir: 'desc'}
        ]
    }

    addDeleteBtn = (props, refreshFunction) => {
        let id = props.dataItem.id;
        return <DeleteButton refreshCertificates={refreshFunction} id={id}/>;
    }

    addViewBtn = (props) => {
        let tagss = ApplicationUtils.tagsArrayToString(props.dataItem.tagSet);
        return <ViewButton data={props} tagList={tagss}/>
    }

    addEditBtn = (props, refreshFunction) => {
        let tagss = ApplicationUtils.tagsArrayToString(props.dataItem.tagSet);
        return <EditButton data={props} refreshFunction={refreshFunction}/>
    }
    
    getAllTags = (props) => {
        let tags = ApplicationUtils.tagsArrayToString(props.dataItem.tagSet);
        return <td>{tags}</td>;
    };

    customCell = (props, refreshFunction) => {
        return (
            <td>
                {this.addDeleteBtn(props, refreshFunction)}
                {this.addViewBtn(props)}
                {this.addEditBtn(props, refreshFunction)}
            </td>
        )

    }


    render() {
        const {data, refreshFunction} = this.props;

        data.forEach(o => {
            o.createDate = new Date(o.createDate);
        });

        return (
            <Grid
                style={{ height: '65vh' }}
                data={orderBy(data, this.state.sort)}
                sortable
                sort={this.state.sort}
                onSortChange={(e) => {
                    this.setState({
                        sort: e.sort
                    });
                }}
            >
                <Column field="createDate" title="Datetime" format="{0: yyyy-MM-dd HH:mm:ss}"/>
                <Column field="name" title="Title" />
                <Column field="tags" title="Tags" cell={this.getAllTags} />
                <Column field="description" title="Description" />
                <Column field="price" title="Price" />
                <Column title="Actions" cell={props => this.customCell(props, refreshFunction)} /> 
            </Grid>
        );
    }
}

export default Table