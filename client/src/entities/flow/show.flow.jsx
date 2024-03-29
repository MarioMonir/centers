import { NumberField, Show, SimpleShowLayout, TextField } from "react-admin";

// ------------------------------------------------

export default function ShowFlow(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <NumberField source="id" />

        <NumberField source="fromUserId" />

        <NumberField source="toUserId" />
        <NumberField source="balance" />
        <TextField source="notes" />
      </SimpleShowLayout>
    </Show>
  );
}
