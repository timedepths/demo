import React from 'react';
import { Create, Edit, SimpleForm, DisabledInput, TextInput, DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, List} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

export const PostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <RichTextInput source="body" />
            <DateInput label="Publication date" source="published_at" defaultValue={new Date()} />
        </SimpleForm>
    </Create>
);
export const PostEdit = (props) => (
    <Edit title="Post edition" {...props}>
        <SimpleForm>
            <DisabledInput label="Id" source="id" />
            {/*<TextInput source="title" validate={required()} />*/}
            {/*<LongTextInput source="teaser" validate={required()} />*/}
            {/*<RichTextInput source="body" validate={required()} />*/}
            <DateInput label="Publication date" source="published_at" />
            <ReferenceManyField label="Comments" reference="comments" target="post_id">
                <Datagrid>
                    <TextField source="body" />
                    <DateField source="created_at" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleForm>
    </Edit>
);
export const PostList = props => (

    <List {...props}>
        <Datagrid rowClick="edit">
            {/*<ReferenceField source="userId" reference="users">*/}
                {/*<TextField source="name" />*/}
            {/*</ReferenceField>*/}
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="body" />
        </Datagrid>
    </List>
);