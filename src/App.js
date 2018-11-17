import React, { Component } from 'react';
import { Admin, Resource,EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import './App.css';
import {UserList} from "./users";
import {PostList,PostActions} from "./posts";
import Dashboard from "./Dashboard";
import authProvider from './authProvider';
import { Editor } from 'slate-react'
import { Value } from 'slate'

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
// const App = () => (
//     <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
//         <Resource name="posts" list={PostList} create={PostActions} edit={EditGuesser} />
//         <Resource name="users" list={UserList} />
//     </Admin>);
const initialState = Value.fromJSON({
    document: {
        nodes: [
            {
                kind: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
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
        value: initialState
    }

    // 发生变更时，使用新的编辑器状态更新应用的 React 状态。
    onChange = ({ value }) => {
        this.setState({ value })
    }
  render() {
    return (
        <Editor
            value={this.state.value}
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
