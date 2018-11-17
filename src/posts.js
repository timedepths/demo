import React from 'react';
import { List, Datagrid, TextField, ReferenceField,EditButton } from 'react-admin';
import { CreateButton } from 'react-admin';

export const PostActions = (basePath) =>(
    <CreateButton basePath={basePath} />
);
export const PostList = props => (

    <List {...props}>
        <Datagrid rowClick="edit">
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="body" />
        </Datagrid>
    </List>
);