import { Create, NumberInput, SimpleForm, TextInput } from "react-admin";

// ------------------------------------------------

export default function CreateAttendance(props) {
  return (
    <Create {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="id" />

        <NumberInput source="groupId" />

        <NumberInput source="studentId" />
        <TextInput source="notes" />
      </SimpleForm>
    </Create>
  );
}
