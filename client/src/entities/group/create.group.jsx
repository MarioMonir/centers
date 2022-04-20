import { BooleanInput, Create, NumberInput, SimpleForm } from "react-admin";

// ------------------------------------------------

export default function CreateGroup(props) {
  return (
    <Create {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="id" />

        <NumberInput source="ownerUserId" />

        <NumberInput source="teacherId" />

        <NumberInput source="collectorUserId" />

        <NumberInput source="ownerFees" />
        <BooleanInput source="public" />
      </SimpleForm>
    </Create>
  );
}
