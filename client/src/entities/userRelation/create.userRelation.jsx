import { Create, NumberInput, SimpleForm } from "react-admin";
import Protected from "../../reactAdmin/components/Protected";
import React, { useState, useEffect } from "react";

// ------------------------------------------------

export default function CreateUserRelation(props) {
  const [loggedUser, setLoggedUser] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoggedUser(user);
  }, []);
  return (
    <Protected loggedUser={loggedUser}>
      <Create {...props}>
        <SimpleForm variant="outlined" redirect="list">
          <NumberInput source="followerId" />

          <NumberInput source="followingId" />
        </SimpleForm>
      </Create>
    </Protected>
  );
}
