import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";

// ------------------------------------------------

export default function CreateFlow(props) {
  return (
    <Create {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="id" />

        <NumberInput source="fromUserId" />

        <NumberInput source="toUserId" />
        <NumberInput source="balance" />
        <TextInput source="notes" />
      </SimpleForm>
    </Create>
  );
}
