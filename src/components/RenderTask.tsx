import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

interface IProps {
    data: [];
}

interface IState {
    taskid: ''
}

class RenderTask extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            taskid: ''

        };
    }

    async componentDidMount() {
    }

    async componentWillMount() {
    }



    render() {
        return (
            <Container style={{ marginLeft: 30}}>
                <h3 style={{ marginTop: 30, marginBottom: 5 }}>
                    Tasks for the list:
                </h3>
                <FormControl component="fieldset">
                    <RadioGroup>
                        {this.props.data.map((task: any, index: any) => {
                                return (
                                    <FormControlLabel value={task.id} control={<Radio />} label={task.name} />
                                );
                        })}
                    </RadioGroup>
                </FormControl>
            </Container>
        );
    }
}
export default RenderTask;