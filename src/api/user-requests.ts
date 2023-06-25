import { UserData } from "@/types";
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

export async function getMe(token: string): Promise<UserData> {
  const request = await axios.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = request.data;
  return data;
}

export async function getUserByUsername(
  username: string,
  token?: string
): Promise<UserData | null> {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const request = await axios.get(`/users/u/${username}`,config);
    const data = request.data;
    return data;
  } catch {
    return null;
  }
}

export async function getAllUsers(): Promise<UserData[]> {
  const request = await axios.get("/users/all");
  const data = request.data;
  return data;
}

export async function searchUser(query: string): Promise<UserData[]> {
  const request = await axios.get(`/users/search?username=${query}`);
  const data = request.data;
  return data;
}