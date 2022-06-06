import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  ReferenceField,
  ResourceContextProvider,
  ShowButton,
  TextField,
  SimpleList,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// ------------------------------------------------

export default function ListEnrolment(groupId) {
  return (
    <ResourceContextProvider value="enrolment">
      <List filter={groupId}>
        {/* <SimpleList
          // leftIcon={<AccountCircleIcon />}
          primaryText={
            <ReferenceField
              source="studentId"
              label="Student name"
              reference="user"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
          }
          secondaryText={<NumberField source="studentId" />}
          // tertiaryText={<NumberField source="studentId" />}
        /> */}
        <Datagrid>
          <NumberField source="studentId" label="Student code" />
          <ReferenceField
            source="studentId"
            label="Student name"
            reference="user"
            link="show"
          >
            <TextField source="name" />
          </ReferenceField>
          <NumberField
            source="balance"
            options={{ style: "currency", currency: "EGP" }}
          />

          <TextField source="lectureCost" />
          <TextField source="centerCost" />

          {/* <Actions>
            <ShowButton />
            <EditButton />
            <DeleteButton />
          </Actions> */}
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
}
