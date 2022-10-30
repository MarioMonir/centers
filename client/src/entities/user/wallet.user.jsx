import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CardContent from "@mui/material/CardContent";
import TextField2 from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  useGetList,
  useTranslate,
  List,
  Datagrid,
  NumberField,
  DateField,
  TextField,
  ResourceContextProvider,
} from "react-admin";
import config from "../../configs/config";

// --------------

export default function WalletUser() {
  const lang = JSON.parse(localStorage.getItem("RaStore.locale"));
  const [loggedUser, setLoggedUser] = useState([]);
  const translate = useTranslate();
  const [users, setUsers] = useState([]);
  const [flowUser, setFlowUser] = useState([]);
  const [groupId, setGroupId] = useState([]);
  const [sentGroup, setSentGroup] = useState();
  const [sentTo, setSentTo] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  // - - - - - - - - - - - - - - - - - - - - - -

  useEffect(() => setLoggedUser(user), []);

  // - - - - - - - - - - - - - - - - - - - - - -

  const { data, loading, error } = useGetList("user", {
    filter: { userType: "Student" },
  });
  if (error) {
    console.error(error);
  }

  // - - - - - - - - - - - - - - - - - - - - - -

  useEffect(() => {
    setUsers(data);
  }, [data]);

  // - - - - - - - - - - - - - - - - - - - - - -

  const { data: flow, error: err } = useGetList("flow", {
    filter: { fromUserId: loggedUser.id },
  });

  // - - - - - - - - - - - - - - - - - - - - - -

  if (err) {
    console.error(err);
  }

  // - - - - - - - - - - - - - - - - - - - - - -

  const { data: idGroup, error: errTo } = useGetList("enrolment", {
    filter: { studentId: sentTo?.id },
  });

  // - - - - - - - - - - - - - - - - - - - - - -

  useEffect(() => {
    setFlowUser(flow);
    setGroupId(idGroup);
  }, [flow, idGroup]);
  console.log(idGroup);

  // - - - - - - - - - - - - - - - - - - - - - -

  let name = loggedUser.name;

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.name + "-" + option?.id,
  });

  // - - - - - - - - - - - - - - - - - - - - - -

  const handleFlow = (e) => {
    fetch(`${config.baseUrl}/flow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        toUserId: sentTo.id,
        groupId: sentGroup,
        description: description,
        //convert string to number
        debit: parseInt(amount),
        fromUserId: loggedUser.id,
        balance: 1000,
        credit: 0,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      });
  };

  // - - - - - - - - - - - - - - - - - - - - - -

  return (
    <Box sx={{ padding: "10px", margin: "10px" }}>
      <form
        onSubmit={handleFlow}
        style={{
          marginLeft: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
            padding: "10px",
            margin: "10px",
          }}
        >
          <div style={{ display: "flex" }}>
            <Typography
              sx={{
                marginRight: "10px",
                marginLeft: "10px",
                cursor: "pointer",
                color: "blue",
              }}
              variant="overline"
              gutterBottom
            >
              {translate("resources.wallet.fields.debit")}
            </Typography>{" "}
            <Typography
              sx={{
                marginLeft: "10px",
                cursor: "pointer",
                color: "blue",
              }}
              variant="overline"
              gutterBottom
            >
              {translate("resources.wallet.fields.credited")}
            </Typography>{" "}
          </div>
          <Autocomplete
            id="filter-demo"
            options={groupId}
            getOptionLabel={(option) => `${option?.groupId}  `}
            filterOptions={filterOptions}
            sx={{ width: 223 }}
            onChange={(event, value) => {
              setSentGroup(value?.groupId);
            }}
            renderInput={(params) => (
              <TextField2
                {...params}
                sx={{ cursor: "pointer" }}
                label={translate("resources.wallet.fields.group")}
                required={true}
                variant="outlined"
              />
            )}
          />
          <TextField2
            label="from"
            variant="outlined"
            value={name}
            defaultValue={name}
            disabled
          />
          <Autocomplete
            id="filter-demo"
            options={users}
            getOptionLabel={(option) => `${option?.id}  -  ${option?.name} `}
            filterOptions={filterOptions}
            sx={{ width: 223 }}
            onChange={(event, value) => {
              setSentTo(value);
              console.log(sentTo);
            }}
            renderInput={(params) => (
              <TextField2
                {...params}
                required={true}
                sx={{ cursor: "pointer" }}
                label={translate("resources.wallet.fields.to")}
                variant="outlined"
              />
            )}
          />

          <TextField2
            label={translate("resources.wallet.fields.amount")}
            variant="outlined"
            required={true}
            type="number"
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/[^0-9]/g, "");
              setAmount(onlyNums);
            }}
            inputProps={{
              inputMode: "numeric",

              min: 0,
              step: 1,
              value: amount,
            }}
          />
          <TextField2
            label={translate("resources.wallet.fields.description")}
            variant="outlined"
            required={true}
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginLeft: "20px",
            marginRight: "20px",
            width: 223,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
          type="submit"
        >
          {translate("resources.wallet.fields.sendMoney")}
        </Button>
      </form>

      <Typography
        sx={{ marginLeft: "50px", marginTop: "10px" }}
        variant="h6"
        gutterBottom
      >
        {translate("resources.wallet.fields.lastTransactions")}
      </Typography>
      <ResourceContextProvider value="flow">
        <List
          filter={{ fromUserId: loggedUser.id }}
          actions={false}
          hasCreate={false}
          sort={{ field: "createdAt", order: "DESC" }}
        >
          <Datagrid bulkActionButtons={false}>
            <NumberField
              source="id"
              label={lang === "ar" ? "كود الطالب" : "Student Code"}
            />
            <DateField showTime source="createdAt" />
            <NumberField source="toUserId" />
            <NumberField source="fromUserId" />
            <TextField
              source="description "
              label={lang === "ar" ? "الوصف" : "Description"}
            />
            <TextField source="notes" />
            <NumberField
              source="credit"
              label={lang === "ar" ? "المبلغ المدفوع" : "credit"}
            />
            <NumberField
              source="debit"
              label={lang === "ar" ? "المبلغ المستلم" : "debit"}
            />
            <NumberField source="balance" />
          </Datagrid>
        </List>
      </ResourceContextProvider>
      {/* <Grid container spacing={2} sx={{ margin: "1px" }}>
        {flowUser?.map((flow) => (
          <Grid
            sx={{
              margin: "20px",
            }}
            flow
            key={flow.id}
          >
            <Card
              sx={{
                minWidth: 310,

                marginTop: "20px",
                marginLeft: "20px",
                padding: "10px",
                background: "linear-gradient(to right, #36d1dc, #5b86e5)",
                color: "white",

                boxShadow: "1px 3px 2px #013e5a",
                borderRadius: "20px",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  //   boxShadow: "0px 0px 10px #013e5a",

                  background: "linear-gradient(to right, #36d1dc9c, #5b87e5a0)",
                  transform: "scale(1.1)",
                },
              }}
            >
              <CardContent sx={{ paddingY: "20px" }}>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.5rem",
                  }}
                  gutterBottom
                  variant="body2"
                  component="div"
                >
                  <Typography variant="span" color={"black"}>
                    From:
                  </Typography>{" "}
                  {flow?.fromUserId}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{
                    color: "white",
                    fontSize: "1.5rem",
                  }}
                  component="div"
                >
                  <Typography variant="span" color={"black"}>
                    To:
                  </Typography>{" "}
                  {flow?.toUserId}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{
                    color: "white",
                    fontSize: "1.5rem",
                  }}
                  component="div"
                >
                  <Typography variant="span" color={"black"}>
                    Amount:
                  </Typography>{" "}
                  {flow?.debit}
                </Typography>

                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{
                    color: "white",
                    fontSize: "1.5rem",
                  }}
                  component="div"
                >
                  <Typography variant="span" color={"black"}>
                    Group Id:
                  </Typography>{" "}
                  {flow?.groupId}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{
                    color: "white",
                    fontSize: "1.5rem",
                  }}
                  component="div"
                >
                  <Typography variant="span" color={"black"}>
                    Notes:
                  </Typography>{" "}
                  {flow?.notes}
                </Typography>

                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{
                    color: "white",
                    fontSize: "1rem",
                  }}
                  component="div"
                >
                  <Typography
                    variant="span"
                    color={"black"}
                    sx={{
                      fontSize: "1.5rem",
                    }}
                  >
                    Description:
                  </Typography>{" "}
                  {flow?.description}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{ color: "white", fontSize: "1rem" }}
                  component="div"
                >
                  <Typography variant="span" color={"black"}>
                    Time:
                  </Typography>{" "}
                  {new Date(flow?.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid> */}
    </Box>
  );
}
