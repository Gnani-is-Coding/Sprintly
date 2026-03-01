import type { UserProfile } from ".";

type userRegisterData = UserProfile;

export interface IregisterProps {
  data: userRegisterData;
  refreshToken: string;
  accessToken: string;
}
