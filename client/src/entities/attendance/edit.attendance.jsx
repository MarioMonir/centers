import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";

// ------------------------------------------------

export default function EditAttendance(props) {
  return (
    <Edit {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="id" />

        <NumberInput source="groupId" />

        <NumberInput source="studentId" />
        <TextInput source="notes" />
      </SimpleForm>
    </Edit>
  );
}
