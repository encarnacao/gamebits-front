import axios from "axios";
import { FollowData } from "@/types";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function getFollowers(userId: number): Promise<FollowData[]> {
  try {
    const request = await axios.get(`/follows/${userId}/followers`);
    return request.data;
  } catch (error) {
    return [];
  }
}

export async function getFollowing(userId: number): Promise<FollowData[]> {
  try {
    const request = await axios.get(`/follows/${userId}/following`);
    return request.data;
  } catch (error) {
    return [];
  }
}

export async function unfollowUser(
  userId: number,
  token: string
): Promise<boolean> {
  try {
    await axios.delete(`/follows/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function followUser(
  userId: number,
  token: string
): Promise<boolean> {
  try {
    await axios.post(
      `/follows/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    return false;
  }
}
