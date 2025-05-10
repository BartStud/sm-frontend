export interface ProfileData {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  picture?: string;
}

export type User = {
  id: string;
  token: string | null;
  profile: ProfileData;
};
