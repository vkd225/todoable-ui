import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import ListTask from './ListTask';
import PostList from './PostList';
import EditList from './EditList';


interface IProps {
}

interface IState {
    token: string;
    taskData: any;
    listID: string;
}

class Dashboard extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.updateToken = this.updateToken.bind(this);
        this.shareListInfo = this.shareListInfo.bind(this);
        this.state = {
            token: '',
            taskData: [],
            listID: ''
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

    async shareListInfo(sharedlistID: string, sharedTaskData: []) {
        this.setState ({
            listID: sharedlistID,
            taskData: sharedTaskData
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
                        <ListTask token={this.state.token} shareListInfo={this.shareListInfo}/>
                    </Route>
                    <Route path="/addlist">
                        <PostList token={this.state.token}/>
                    </Route>
                    <Route path="/editlist">
                        <EditList token={this.state.token} data={this.state.taskData} listId={this.state.listID}/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}
export default Dashboard;
