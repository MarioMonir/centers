import { NumberField, Show, SimpleShowLayout, TextField } from "react-admin";

// ------------------------------------------------

export default function ShowAttendance(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <NumberField source="id" />
        <NumberField source="groupId" />
        <NumberField source="studentId" />
        <TextField source="notes" />
      </SimpleShowLayout>
    </Show>
  );
}
