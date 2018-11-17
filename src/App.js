import React, { Component } from 'react';
import { Admin, Resource,EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import './App.css';
import {UserList} from "./users";
import {PostList,PostActions} from "./posts";
import Dashboard from "./Dashboard";
import authProvider from './authProvider';
import { Editor } from 'slate-react'
import { State } from 'slate'

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
// const App = () => (
//     <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
//         <Resource name="posts" list={PostList} create={PostActions} edit={EditGuesser} />
//         <Resource name="users" list={UserList} />
//     </Admin>);
const initialState = State.fromJSON({
    document: {
        nodes: [
            {
                kind: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        kind: 'text',
                        ranges: [
                            {
                                text: 'A line of text in a paragraph.'
                            }
                        ]
                    }
                ]
            }
        ]
    }
})
class App extends Component {
    // 设置应用创建时的初始状态。
    state = {
        state: initialState
    }

    // 发生变更时，使用新的编辑器状态更新应用的 React 状态。
    onChange = ({ state }) => {
        this.setState({ state })
    }
  render() {
    return (
        <Editor
            state={this.state.state}
            onChange={this.onChange}
        />
        // <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
        //     <Resource name="posts" list={PostList} create={PostActions} edit={EditGuesser} />
        //     <Resource name="users" list={UserList} />
        // </Admin>
      // {/*<div className="App">*/}
      //   {/*<header className="App-header">*/}
      //
      //     {/*<p>*/}
      //       {/*Edit <code>src/App.js</code> and save to reload.*/}
      //     {/*</p>*/}
      //     {/*<a*/}
      //       {/*className="App-link"*/}
      //       {/*href="https://reactjs.org"*/}
      //       {/*target="_blank"*/}
      //       {/*rel="noopener noreferrer"*/}
      //     {/*>*/}
      //       {/*Learn React*/}
      //     {/*</a>*/}
      //   {/*</header>*/}
      // {/*</div>*/}
    );
  }
}

export default App;
