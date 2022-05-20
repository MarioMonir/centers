import { Edit, NumberInput, SimpleForm, TextInput } from "react-admin";

// ------------------------------------------------

export default function EditEnrolment(props) {
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
