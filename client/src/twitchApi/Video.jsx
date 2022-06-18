const video = (token) => {
  return (
    <Box
      mb={3}
      sx={{ display: "flex", justifyContent: "center", mr: 2, color: "white" }}
    >
      <CardMedia
        component="iframe"
        // src="https://player.twitch.tv/?channel=faker&parent=localhost"
        // height="800"
        // title="Faker stream"
        // controls
        src={`https://player.twitch.tv/?channel=eduhubapp&parent=localhost&token=${token}`}
        height="720"
        width="1280"
        allowfullscreen
      />
    </Box>
  );
};

// ===========================================================

export default video;
