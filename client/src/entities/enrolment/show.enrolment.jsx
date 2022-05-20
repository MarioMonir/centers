import { NumberField, Show, SimpleShowLayout, TextField } from "react-admin";

// ------------------------------------------------

export default function ShowEnrolment(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <NumberField source="groupId" />

        <NumberField source="studentId" />
        <TextField source="lectureCost" />
        <TextField source="centerCost" />
        <NumberField source="balance" />
      </SimpleShowLayout>
    </Show>
  );
}
