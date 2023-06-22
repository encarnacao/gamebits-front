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
