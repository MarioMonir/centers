import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  DateInput,
} from "react-admin";

// ------------------------------------------------

export default function EditEnrollment(props) {
  return (
    <Edit {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="groupId" />

        <NumberInput source="studentId" />
        <TextInput source="lectureCost" />
        <TextInput source="centerCost" />
        <NumberInput source="balance" />
      </SimpleForm>
    </Edit>
  );
}
