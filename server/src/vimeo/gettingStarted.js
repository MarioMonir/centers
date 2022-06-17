import { Vimeo } from "vimeo";

let client = new Vimeo(
  "313f481a92cdfbd308af912245ed66e0aaa90c35",
  "NLSncX5d9EuvcMDXw5Gk2KPf8LBowpKQ3MBItK97bOz0TsjDcegJ4p2LSfYPKa9U3e8hJl47lh4XJP7xo6uRbuVwfe3J2lpdnaUwZZhG/a/CBXSkYhjhPPKV+449LRTH",
  "8342771041d28beca45d6f86ce91b1cf"
);

console.log(
  process.env.VIMEO_CLIENT_ID,
  process.env.VIMEO_CLIENT_SECRET,
  process.env.VIMEO_ACCESS_TOKEN
);

client.request(
  {
    method: "GET",
    path: "/tutorial",
  },
  function (error, body, status_code, headers) {
    if (error) {
      console.log(error);
    }

    console.log(body);
  }
);
