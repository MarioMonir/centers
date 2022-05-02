import { BooleanInput, Edit, NumberInput, SimpleForm } from "react-admin";

// ------------------------------------------------

export default function EditGroup(props) {
  return (
    <Edit {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="id" />

        <NumberInput source="ownerUserId" />

        <NumberInput source="teacherId" />

        <NumberInput source="collectorUserId" />

        <NumberInput source="ownerFees" />
        <BooleanInput source="public" />
      </SimpleForm>
    </Edit>
  );
}
