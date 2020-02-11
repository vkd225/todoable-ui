import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Redirect } from 'react-router-dom'
import * as HttpStatus from 'http-status-codes';

interface IProps {
    token: string;
}

interface IState {
    valid: boolean;
    name: string;
    nameTaken: string;
    goBackToList: boolean;
}

class RenderList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.postList = this.postList.bind(this);
        this.goBackToList = this.goBackToList.bind(this);
        this.state = {
            valid: true,
            name: '',
            nameTaken: '',
            goBackToList: false
        };
    }

    async componentDidMount() {
    }

    async componentWillMount() {
    }

    async postList () {

        if (this.state.name === '') {
            await this.setState({
                nameTaken: 'empty'
            })
        }

        let url = 'https://xwyir2jma1.execute-api.us-east-1.amazonaws.com/prod/todos?function=post_list&token='
        + this.props.token + '&name=' + this.state.name
        console.log('url: ', url)

        let result = await fetch(url, {
            method: 'GET'
        });

        // Bail if status code is not OK
        if ((result.status).toString() !== (HttpStatus.OK).toString()) return undefined;

        // Read response
        let response = await result.json();

        if (response.response === 'list name already used') {
            await this.setState({
                nameTaken: 'used'
            })
        } else {
            await this.setState({
                valid: true,
                nameTaken: 'posted'
            })
            console.log('name',this.state.name)
        }
    }

    async goBackToList (){
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
                    <TextField id="outlined-basic" label="List name" variant="outlined"
                        style={{ margin: 50 }}
                        onChange={e => this.setState({ name: e.target.value })}
                    />

                    <Button variant="contained" color="primary"
                        style={{ marginTop: 60 }}
                        onClick={this.postList}>
                        Add List
                    </Button>

                    {(this.state.nameTaken === 'posted') ?
                        <h3>List Post sucessful</h3>
                    :

                    (this.state.nameTaken === 'used') ?
                        <h3>List name is already used</h3>
                    :
                    (this.state.nameTaken === '') ?
                        <h3>List name cannot be empty</h3>
                    :
                        <h3>something went wrong.</h3>
                    }

                </div>


                <div style={{ textAlign: "center", verticalAlign: "center"}}>
                    <Button variant="contained" color="secondary"
                        style={{ margin: 50 }}
                        onClick={this.goBackToList}>
                            Go back to List view
                    </Button>
                </div>

            </Container>
        );
    }
}
export default RenderList;