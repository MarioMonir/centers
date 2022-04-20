import { Create, NumberInput, SimpleForm, TextInput } from "react-admin";

// ------------------------------------------------

export default function CreateRequest(props) {
  return (
    <Create {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="id" />

        <NumberInput source="fromUserId" />

        <NumberInput source="toUserId" />

        <TextInput source="note" />
      </SimpleForm>
    </Create>
  );
}
