import axios from 'axios';

interface UserInfo {
  id: number;
  nickname: string;
  role: string;
  email: string;
}

interface LoginResponse {
  token: string;
  user: UserInfo;
}

export const postGoogleLogin = async (idToken: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>('http://localhost:8080/api/auth/google', { idToken });
  return response.data;
};

export const getMe = async (token: string): Promise<UserInfo> => {
  const response = await axios.get<UserInfo>('http://localhost:8080/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
