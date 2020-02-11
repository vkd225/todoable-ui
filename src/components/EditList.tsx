import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Redirect } from 'react-router-dom'
import * as HttpStatus from 'http-status-codes';

import RenderTaskComplete from './RenderTaskComplete';

interface IProps {
    token: string;
    listId: string;
    data: [];
}

interface IState {
    editList: string;
    updateListName: string;
    taskName: string;
    addTask: string;
    goBackToList: boolean;
}

class EditList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.updateList = this.updateList.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.goBackToList = this.goBackToList.bind(this);
        this.state = {
            editList: '',
            updateListName: '',
            taskName: '',
            addTask: '',
            goBackToList: false
        };
    }

    async componentDidMount() {
    }

    async componentWillMount() {
    }

    async updateList () {
        let url = 'https://xwyir2jma1.execute-api.us-east-1.amazonaws.com/prod/todos?function=update_list&token='
        + this.props.token + '&name=' + this.state.updateListName + '&list_id=' + this.props.listId

        let result = await fetch(url, {
            method: 'GET'
        });

        // Bail if status code is not OK
        if ((result.status).toString() !== (HttpStatus.OK).toString()) return undefined;

        // Read response
        let response = await result.json();

        if (response.response === 'invalid token') {
            await this.setState({
                editList: 'invalid'
            })
        } else {
            await this.setState({
                updateListName: this.state.updateListName,
                editList: 'listUpdated'
            })

            await this.goBackToList()
        }
    }

    async deleteList (){
        let url = 'https://xwyir2jma1.execute-api.us-east-1.amazonaws.com/prod/todos?function=delete_list&token='
        + this.props.token + '&list_id=' + this.props.listId

        let result = await fetch(url, {
            method: 'GET'
        });

        // Bail if status code is not OK
        if ((result.status).toString() !== (HttpStatus.OK).toString()) return undefined;

        // Read response
        let response = await result.json();

        if (response.response === 'invalid token') {
            await this.setState({
                editList: 'invalid'
            })
        } else {
            await this.setState({
                editList: 'listdeleted',
            })
            await this.goBackToList()
        }
    }

    async goBackToList(){
        await this.setState({
            goBackToList: true
        })

    }

    render() {

        if (this.state.goBackToList) {
            return <Redirect to="/list" />
        }

        return (
            <Container>

                <div style={{ textAlign: "center", verticalAlign: "center"}}>

                    <div>
                    <TextField id="outlined-basic" label="Update Item" variant="outlined"
                        style={{ margin: 20, marginTop: 50 }}
                        onChange={e => this.setState({ updateListName: e.target.value })}
                    />

                    <Button variant="contained" color="primary"
                        style={{ margin: 20, marginTop: 60 }}
                        onClick={this.updateList}>
                        Update
                    </Button>

                    </div>

                    <Button variant="contained" color="secondary"
                        style={{ margin: 30 }}
                        onClick={this.deleteList}>
                        Delete List
                    </Button>

                    {(this.state.editList === 'listUpdated') ?
                        <h3>List update sucessful</h3>
                    :

                    (this.state.editList === 'listdeleted') ?
                        <h3>List name is already used</h3>
                    :
                    null
                    }

                </div>

                <RenderTaskComplete data={this.props.data} token={this.props.token} listId={this.props.listId}/>
            </Container>
        );
    }
}
export default EditList;