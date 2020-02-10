import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom'

import * as HttpStatus from 'http-status-codes';

interface IProps {
    updateToken: any;
}

interface IState {
    username: string;
    password: string;
    token: string;
    valid: boolean;
    changeView: boolean;
}

class Login extends Component<IProps, IState> {  
    constructor(props: IProps) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.login = this.login.bind(this);
        this.getToken = this.getToken.bind(this);
        this.sendData = this.sendData.bind(this);
        this.state = {
            username: '',
            password: '',
            token: '',
            valid: true,
            changeView: false
        };
    }

    componentDidMount() {
    }

    componentWillMount() {
    }


    async login() {
        await this.setState({
            username: this.state.username, 
            password: this.state.password
        })
        console.log('user: ', this.state.username)
        console.log('pass: ', this.state.password)
        let url = 'https://xwyir2jma1.execute-api.us-east-1.amazonaws.com/prod/todos?function=login&username=' + 
            this.state.username + '&password=' + this.state.password

        await this.getToken(url)
    }

    async getToken (url: string) {
        try {
            let result = await fetch(url, {
                method: 'GET'
            });

            // Bail if status code is not OK
            if ((result.status).toString() !== (HttpStatus.OK).toString()) return undefined;

            // Read response
            let response = await result.json();
            
            try {
                if (response.response === 'invalid credentials') {
                    await this.setState({
                        valid: false, 
                    })
                } else {
                    await this.setState({
                        valid: true, 
                        token: response.response.token
                    })
                    console.log('TOKEN: ', this.state.token)
                }
            } catch (error) {
                    await this.setState({
                        valid: false, 
                    })
            }
            await this.sendData();
            return 'send token'

        } catch (error) 
        {
            await this.setState({
                valid: false, 
            })
            return this.state.token;
        }
    }

    async sendData() {
        this.props.updateToken(this.state.token)
        if (this.state.valid) {
            this.setState({
                changeView: true 
            })
        }
    }

    render() {
        if (this.state.changeView) {
            return <Redirect to="/list" />
        }
        return (
            <Container maxWidth="xs">
            <div style={{ marginTop: 50 }}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form>
                    <TextField
                        variant="outlined" 
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        value={this.state.username}
                        onChange={e => this.setState({ username: e.target.value })}
                    />
                    <TextField
                        variant="outlined" 
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.login}
                    >
                        Sign In
                    </Button>
                </form>
                {
                    (!this.state.valid) ?
                    <h2 style={{ textAlign:"center" }}> INVALID CREDENTIALS </h2>
                :
                    null 
                }
            
            </div>

            </Container>
        );
    }
}
export default Login;
