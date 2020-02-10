import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import ListTask from './ListTask';
import PostList from './PostList'

interface IProps {
}

interface IState {
    token: string;
}

class Dashboard extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.updateToken = this.updateToken.bind(this);
        this.state = {
            token: ''
        };
    }

    componentDidMount() {
    }

    componentWillMount() {
    }

    async updateToken(sharedToken: string) {
        this.setState ({
            token: sharedToken 
        })
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login updateToken={this.updateToken}/>
                    </Route>
                    <Route path="/list">
                        <ListTask token={this.state.token}/>
                    </Route>
                    <Route path="/addlist">
                        <PostList token={this.state.token}/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}
export default Dashboard;
