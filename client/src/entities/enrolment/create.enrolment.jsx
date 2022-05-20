import { Create, NumberInput, SimpleForm, TextInput } from "react-admin";

// ------------------------------------------------

export default function CreateEnrolment(props) {
  return (
    <Create {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="groupId" />
        <NumberInput source="studentId" />
        <TextInput source="lectureCost" />
        <TextInput source="centerCost" />
        <NumberInput source="balance" />
      </SimpleForm>
    </Create>
  );
}
