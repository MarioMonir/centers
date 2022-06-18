import request from "request";

// ===================================================

export const getAccessToken = () => {
  const options = {
    url: "https://id.twitch.tv/oauth2/token",
    json: true,
    body: {
      client_id: process.env.TWITCH_CLIENT_ID, //"0xazdl99cz8c9nv2e3in5i586lb3vc", //
      client_secret: process.env.TWITCH_CLIENT_SECRET, //"cjcma32rjfzyck5hpgjcn6jg5b1ypq", //
      redirect_uri: "http://localhost:3000/",
      response_type: "token",
      scope: "channel:manage:videos ",
    },
  };

  request.post(options, (err, res, body) => {
    if (err) return console.log(err);
    console.log(`status: ${res.statusCode}`);
    console.log({ body });
    return res.body;
  });
};

// ===================================================

export const refreshAccessToken = (refreshToken) => {
  const options = {
    url: "https://id.twitch.tv/oauth2/token",
    json: true,
    body: {
      client_id: process.env.TWITCH_CLIENT_ID, //"0xazdl99cz8c9nv2e3in5i586lb3vc", //
      client_secret: process.env.TWITCH_CLIENT_SECRET, //"cjcma32rjfzyck5hpgjcn6jg5b1ypq", //
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    },
  };

  request.post(options, (err, res, body) => {
    if (err) return console.log(err);
    console.log(`status: ${res.statusCode}`);
    console.log({ body });
    return res.body;
  });
};

// ===================================================
