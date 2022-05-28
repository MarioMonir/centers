import {
  Loading,
  NotFound,
  NumberField,
  RecordContextProvider,
  Show,
  SimpleShowLayout,
  TextField,
  useGetOne,
  Title,
  useGetMany,
} from "react-admin";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

// ------------------------------------------------

export default function ShowUser({ id }) {
  // console.log({ id });
  const { data, isLoading, error } = useGetOne(
    "user",
    { id },
    { enabled: id ? true : false }
  );

  if (error) console.error({ error });

  if (isLoading) return <Loading />;

  if (!data || error) return null;

  return (
    <RecordContextProvider value={data}>
      {/* <Show hasEdit={false}> */}
      <div>
        <Card>
          <SimpleShowLayout>
            <NumberField source="id" />
            <TextField source="name" />

            <TextField source="email" />
            <TextField source="password" />
            <TextField source="permission" />
          </SimpleShowLayout>
        </Card>
      </div>
      {/* <SimpleShowLayout>
            <Typography variant="h5">Student Info</Typography>

            <NumberField source="id" />
            <TextField source="name" />

            <TextField source="email" />
            <TextField source="password" />
            <TextField source="permission" />
          </SimpleShowLayout> */}
      {/* </Show> */}
    </RecordContextProvider>
  );
}
