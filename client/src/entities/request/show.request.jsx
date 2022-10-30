import { NumberField, Show, SimpleShowLayout, TextField } from "react-admin";

// ------------------------------------------------

export default function ShowRequest(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <NumberField source="id" />

        <NumberField source="fromUserId" />

        <NumberField source="toUserId" />

        <TextField source="note" />
      </SimpleShowLayout>
    </Show>
  );
}
