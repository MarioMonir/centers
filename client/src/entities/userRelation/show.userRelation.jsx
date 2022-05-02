import { NumberField, Show, SimpleShowLayout } from "react-admin";

// ------------------------------------------------

export default function ShowUserRelation(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <NumberField source="followerId" />

        <NumberField source="followingId" />
      </SimpleShowLayout>
    </Show>
  );
}
