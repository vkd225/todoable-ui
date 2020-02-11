import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Redirect } from 'react-router-dom'
import * as HttpStatus from 'http-status-codes';

interface IProps {
    data: [];
    token: string;
    listId: string;
}

interface IState {
    taskid: string;
    editTask: string;
    goBackToList: boolean;
    taskName: string;

}

class RenderTaskComplete extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.handleTaskChange = this.handleTaskChange.bind(this);
        this.postTask = this.postTask.bind(this);
        this.goBackToList = this.goBackToList.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.state = {
            taskid: '',
            editTask: '',
            goBackToList: false,
            taskName: ''
        };
    }

    async componentDidMount() {
    }

    async componentWillMount() {
    }

    async handleTaskChange (event: any) {
        await this.setState({
            taskid: event.target.value,
        });

    };

    async postTask (){
        let url = 'https://xwyir2jma1.execute-api.us-east-1.amazonaws.com/prod/todos?function=post_task_in_list&token='
        + this.props.token + '&list_id=' + this.props.listId + '&name=' + this.state.taskName
        console.log('url: ', url)

        let result = await fetch(url, {
            method: 'GET'
        });

        // Bail if status code is not OK
        if ((result.status).toString() !== (HttpStatus.OK).toString()) return undefined;

        // Read response
        let response = await result.json();

        if (response.response === 'invalid token') {
            await this.setState({
                editTask: 'invalid'
            })
        } else {
            await this.setState({
                editTask: 'taskAdded'
            })

            await this.goBackToList()
        }
    }

    async completeTask (){
        let url = 'https://xwyir2jma1.execute-api.us-east-1.amazonaws.com/prod/todos?function=complete_task_in_list&token='
        + this.props.token + '&list_id=' + this.props.listId + '&item_id=' + this.state.taskid
        console.log('url: ', url)

        let result = await fetch(url, {
            method: 'GET'
        });

        // Bail if status code is not OK
        if ((result.status).toString() !== (HttpStatus.OK).toString()) return undefined;

        // Read response
        let response = await result.json();

        if (response.response === 'marked finished') {
            await this.setState({
                editTask: 'taskCompleted'
            })
        } else {
            await this.setState({
                editTask: 'invalid'
            })
        }
        await this.goBackToList();
    }

    async deleteTask (){
        let url = 'https://xwyir2jma1.execute-api.us-east-1.amazonaws.com/prod/todos?function=delete_task_in_list&token='
        + this.props.token + '&list_id=' + this.props.listId + '&item_id=' + this.state.taskid
        console.log('url: ', url)

        let result = await fetch(url, {
            method: 'GET'
        });

        // Bail if status code is not OK
        if ((result.status).toString() !== (HttpStatus.OK).toString()) return undefined;

        // Read response
        let response = await result.json();

        if (response.response === 'invalid token') {
            await this.setState({
                editTask: 'invalid'
            })
        } else {
            await this.setState({
                editTask: 'taskDeleted'
            })
        }
        await this.goBackToList();
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
            <Container style={{ marginLeft: 30}}>
                <h3 style={{ marginTop: -10, marginBottom: 5 }}>
                    Tasks for the list:
                </h3>
                <FormControl component="fieldset">
                    <RadioGroup>
                        {this.props.data.map((task: any, index: any) => {
                                return (
                                    <div style={{paddingTop: 10}}>
                                        <FormControlLabel value={task.id} control={<Radio />} onClick={this.handleTaskChange} label={task.name} />
                                        <p style={{margin: 5, marginLeft: 40}}>Finished at: {task.finished_at}</p>
                                    </div>

                                );
                        })}
                    </RadioGroup>
                </FormControl>

                <div>
                    <div>
                        <TextField id="outlined-basic" label="Add Task"
                            style={{ margin: 20, marginTop: 10 }}
                            onChange={e => this.setState({ taskName: e.target.value })}
                        />
                    </div>
                    <div>
                        <Button variant="contained" color="primary"
                            style={{ margin: 20, marginTop: 10 }}
                            onClick={this.postTask}>
                            Add Task
                        </Button>

                        <Button variant="contained"
                            style={{ margin: 20, marginTop: 10 }}
                            onClick={this.completeTask}>
                            Mark as done
                        </Button>

                        <Button variant="contained" color="secondary"
                            style={{ margin: 20, marginTop: 10 }}
                            onClick={this.deleteTask}>
                            Delete Task
                        </Button>

                    </div>
                </div>


                <div style={{ textAlign: "center", verticalAlign: "center"}}>
                    <Button variant="contained"
                        style={{ margin: 50 }}
                        onClick={this.goBackToList}>
                            Go back to List view
                    </Button>
                </div>
            </Container>
        );
    }
}
export default RenderTaskComplete;