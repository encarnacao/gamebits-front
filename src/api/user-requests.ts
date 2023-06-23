import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function userSingUp(body: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    await axios.post("/users/signup", body);
    return true;
  } catch (error: any) {
    console.log(error);
    if (error.response.status === 409) {
      alert("E-mail ou username já cadastrados");
    } else {
      alert(`Error ${error.response.status}: ${error.response.data.message}`);
    }
    return false;
  }
}

export async function userSignIn(body: { email: string; password: string }) {
  try {
    const response = await axios.post("/users/signin", body);
    return response.data;
  } catch (error: any) {
    console.log(error);
    alert(`Error ${error.response.status}: ${error.response.data.message}`);
    return false;
  }
}

export async function getMe(token: string) {
  const request = await axios.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = request.data;
  return data;
}
