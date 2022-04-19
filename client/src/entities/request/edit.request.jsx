import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";

// ------------------------------------------------

export default function EditRequest(props) {
  return (
    <Edit {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="id" />

        <NumberInput source="fromUserId" />

        <NumberInput source="toUserId" />

        <TextInput source="note" />
      </SimpleForm>
    </Edit>
  );
}
