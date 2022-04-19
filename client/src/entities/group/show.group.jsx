import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
} from "react-admin";

// ------------------------------------------------

export default function ShowGroup(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <NumberField source="id" />

        <NumberField source="ownerUserId" />

        <NumberField source="teacherId" />

        <NumberField source="collectorUserId" />

        <NumberField source="ownerFees" />
        <BooleanField source="public" />
      </SimpleShowLayout>
    </Show>
  );
}
