import { Create, NumberInput, SimpleForm, TextInput } from "react-admin";

// ------------------------------------------------

export default function CreateUser(props) {
  return (
    <Create {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="userId" />
        <TextInput source="content" />
      </SimpleForm>
    </Create>
  );
}
