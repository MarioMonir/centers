import { Create, SimpleForm, TextInput } from "react-admin";

// ------------------------------------------------

export default function CreateUser(props) {
  return (
    <Create {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <TextInput source="name" />
        <TextInput source="email" />
        <TextInput source="password" />
        <TextInput source="permission" />
      </SimpleForm>
    </Create>
  );
}
