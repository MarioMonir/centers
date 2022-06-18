import { Create, SimpleForm, TextInput, useTranslate } from "react-admin";

// ------------------------------------------------

export default function CreateUser(props) {
  return (
    <Create {...props} transform={(data) => ({ ...data, info: {} })}>
      <SimpleForm variant="outlined" redirect="list">
        <TextInput source="name" />
        <TextInput source="email" />
        <TextInput source="password" />
        <TextInput source="permission" />
        <TextInput source="userType" />
      </SimpleForm>
    </Create>
  );
}
