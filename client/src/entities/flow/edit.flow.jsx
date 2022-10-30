import { Edit, NumberInput, SimpleForm, TextInput } from "react-admin";

// ------------------------------------------------

export default function EditFlow(props) {
  return (
    <Edit {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="id" />
        <NumberInput source="fromUserId" />
        <NumberInput source="toUserId" />
        <NumberInput source="balance" />
        <TextInput source="notes" />
      </SimpleForm>
    </Edit>
  );
}
