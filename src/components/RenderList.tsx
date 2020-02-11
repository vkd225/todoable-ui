import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

// import { Redirect } from 'react-router-dom'
import * as HttpStatus from 'http-status-codes';

import RenderTask from './RenderTask';

interface IProps {
    data: [];
    token: string;
    shareListInfo: any;
}

interface IState {
    listid: string;
    valid: boolean;
    tasks: any;
}

class RenderList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.handleListChange = this.handleListChange.bind(this);
        this.getListTasks = this.getListTasks.bind(this);
        this.state = {
            listid: '',
            valid: true,
            tasks: [],
        };
    }

    async componentDidMount() {
    }

    async componentWillMount() {
    }

    async handleListChange (event: any) {
        await this.setState({
            listid: event.target.value,
        });
        console.log('ids: ', this.state.listid)
        await this.getListTasks()

    };

    async getListTasks () {
        let url = 'https://xwyir2jma1.execute-api.us-east-1.amazonaws.com/prod/todos?function=get_list_tasks&token='
        + this.props.token + '&list_id=' + this.state.listid
        console.log('url: ', url)

        let result = await fetch(url, {
            method: 'GET'
        });

        // Bail if status code is not OK
        if ((result.status).toString() !== (HttpStatus.OK).toString()) return undefined;

        // Read response
        let response = await result.json();

        if (response.response === 'invalid token') {
            console.log('tasks invalid', this.state.tasks)
        } else {
            await this.setState({
                valid: true,
                tasks: response.response.items
            })
            console.log('tasks',this.state.tasks)
        }

        this.props.shareListInfo(this.state.listid, this.state.tasks)
    }

    render() {
        // if (!this.state.valid) {
        //     return <Redirect to="/" />
        // }

        return (
            <Container>
                    <FormControl component="fieldset">

                        <RadioGroup>
                            {this.props.data.map((list: any, index: any) => {
                                        return (
                                            <FormControlLabel value={list.id} control={<Radio />} onClick={this.handleListChange} label={list.name} />
                                        );
                            })}

                        </RadioGroup>
                    </FormControl>
                    {(this.state.tasks.length !== 0) ?
                        <RenderTask data={this.state.tasks}/>
                    :

                    <h3>No tasks present.</h3>
                    
                    }
            </Container>
        );
    }
}
export default RenderList;