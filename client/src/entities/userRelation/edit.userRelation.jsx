import { Edit, NumberInput, SimpleForm } from "react-admin";

// ------------------------------------------------

export default function EditUserRelation(props) {
  return (
    <Edit {...props}>
      <SimpleForm variant="outlined" redirect="list">
        <NumberInput source="followerId" />

        <NumberInput source="followingId" />
      </SimpleForm>
    </Edit>
  );
}
