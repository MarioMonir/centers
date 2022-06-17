const request = require("request");

// ===================================================

const getToken = (callback) => {
  const options = {
    url: "https://id.twitch.tv/oauth2/token",
    json: true,
    body: {
      client_id: "0xazdl99cz8c9nv2e3in5i586lb3vc", // process.env.TWITCH_CLIENT_ID,
      client_secret: "cjcma32rjfzyck5hpgjcn6jg5b1ypq", // process.env.TWITCH_CLIENT_SECRET,
      grant_type: "client_credentials",
    },
  };

  request.post(options, (err, res, body) => {
    if (err) return console.log(err);
    console.log(`status: ${res.statusCode}`);
    console.log({ body });
    callback(res);
  });
};

// ===================================================

getToken((res) => console.log(res.body));

// ===================================================
