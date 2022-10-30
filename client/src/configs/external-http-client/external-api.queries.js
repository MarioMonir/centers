import externalAPI from "./external-api.config";

// ===============================================================

export async function signup({ email, password, userType, name }) {
  try {
    const res = await externalAPI.post("/oauth/register", {
      email,
      password,
      userType,
      name,
    });
    const data = await res.data;
    return data;
  } catch (e) {
    console.error("error in create entity:", entity);
    console.error("error message: ", e.message);
    console.error("error: ", e);
  }
}
