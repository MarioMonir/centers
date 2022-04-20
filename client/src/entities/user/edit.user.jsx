import { Edit, NumberInput, SimpleForm, TextInput } from "react-admin";

// ------------------------------------------------

export default function EditUser(props) {
  return (
    <Edit {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="id" />
        <TextInput source="name" />

        <TextInput source="email" />
        <TextInput source="password" />
        <TextInput source="permission" />
      </SimpleForm>
    </Edit>
  );
}
