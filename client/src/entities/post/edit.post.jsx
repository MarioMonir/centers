import { Edit, TextInput, SimpleForm, required } from "react-admin";

// ------------------------------------------------

const EditPost = () => {
  return (
    <Edit mutationMode="pessimistic">
      <SimpleForm redirect="list">
        <TextInput
          source="content"
          fullWidth
          multiline
          label=""
          placeholder="Write a post..."
          validate={required()}
        />
      </SimpleForm>
    </Edit>
  );
};

// ------------------------------------------------

export default EditPost;
