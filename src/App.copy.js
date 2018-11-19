import React from 'react';
import { Admin, Resource,EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import './App.css';
import {UserList} from "./users";
import {PostList,PostActions} from "./posts";
import Dashboard from "./Dashboard";
import authProvider from './authProvider';
import { Editor } from 'slate-react'
import { Value } from 'slate'
import Plain from 'slate-plain-serializer'
import Html from 'slate-html-serializer'

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
// const App = () => (
//     <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
//         <Resource name="posts" list={PostList} create={PostActions} edit={EditGuesser} />
//         <Resource name="users" list={UserList} />
//     </Admin>);
// const existingValue = localStorage.getItem('content')
const initialValue =  localStorage.getItem('content') || '<p></p>'

const BLOCK_TAGS = {
    blockquote: 'quote',
    p: 'paragraph',
    pre: 'code',
}
const MARK_TAGS = {
    em: 'italic',
    strong: 'bold',
    u: 'underline',
}
const rules = [
    // Add our first rule with a deserializing function.
    {
        deserialize(el, next) {
            const type = BLOCK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                    object: 'block',
                    type: type,
                    data: {
                        className: el.getAttribute('class'),
                    },
                    nodes: next(el.childNodes),
                }
            }
        },
        serialize(obj, children) {
            if (obj.object == 'block') {
                switch (obj.type) {
                    case 'code':
                        return (
                            <pre>
                                <code>{children}</code>
                            </pre>
                        )
                    case 'paragraph':
                        return <p className={obj.data.get('className')}>{children}</p>
                    case 'quote':
                        return <blockquote>{children}</blockquote>
                }
            }
        },
    },
    {
        deserialize(el, next) {
            const type = MARK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                    object: 'mark',
                    type: type,
                    nodes: next(el.childNodes),
                }
            }
        },
        serialize(obj, children) {
            if (obj.object == 'mark') {
                switch (obj.type) {
                    case 'bold':
                        return <strong>{children}</strong>
                    case 'italic':
                        return <em>{children}</em>
                    case 'underline':
                        return <u>{children}</u>
                }
            }
        },
    },
]
const html = new Html({ rules })
// Initialize a plugin for each mark...
const plugins = [
    MarkHotkey({ key: 'b', type: 'bold' }),
    MarkHotkey({ key: 'q', type: 'code' }),
    MarkHotkey({ key: 'i', type: 'italic' }),
    MarkHotkey({ key: '~', type: 'strikethrough' }),
    MarkHotkey({ key: 'u', type: 'underline' }),
]

function MarkHotkey(options) {
    // Grab our options from the ones passed in.
    const { type, key } = options
    // Return our "plugin" object, containing the `onKeyDown` handler.
    return {
        onKeyDown(event, editor, next) {
            // If it doesn't match our `key`, let other plugins handle it.
            if (!event.ctrlKey || event.key != key) return next()

            // Prevent the default characters from being inserted.
            event.preventDefault()

            // Toggle the mark `type`.
            editor.toggleMark(type)
        },
    }

}

class App extends React.Component {
    // 设置应用创建时的初始状态。
    state = {
        value: html.deserialize(initialValue),
    }

    // 发生变更时，使用新的编辑器状态更新应用的 React 状态。
    onChange = ({ value }) => {
        // Check to see if the document has changed before saving.
        if (value.document != this.state.value.document) {
            const string = html.serialize(value)
            localStorage.setItem('content', string)
        }
        this.setState({ value })
    }

    render() {
        return (
            <Editor
                plugins={plugins}
                value={this.state.value}
                onChange={this.onChange}
                renderNode={this.renderNode}
                renderMark={this.renderMark}
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

    renderNode = (props, editor, next) => {
        switch (props.node.type) {
            case 'code':
                return (
                    <pre {...props.attributes}>
                        <code>{props.children}</code>
                     </pre>
                )
                break;
            case 'paragraph':
                return (
                    <p {...props.attributes} className={props.node.data.get('className')}>
                        {props.children}
                    </p>
                )
                break;
            case 'quote':
                return <blockquote {...props.attributes}>{props.children}</blockquote>
                break;
            default:
                return next()
        }
    }

    renderMark = (props, editor, next) => {
        const { mark, attributes } = props
        switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{props.children}</strong>; break;
            case 'code':
                return <code {...attributes}>{props.children}</code>; break;
            case 'italic':
                return <em {...attributes}>{props.children}</em>; break;
            case 'strikethrough':
                return <del {...attributes}>{props.children}</del>; break;
            case 'underline':
                return <u {...attributes}>{props.children}</u>;break;
            default:
                return next()
        }
    }
}

export default App;
