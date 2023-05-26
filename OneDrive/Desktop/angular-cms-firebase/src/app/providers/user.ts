export interface User {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoUrl: string | null;
  roles: Roles;
}

export interface Roles {
  subscriber?: boolean;
  admin?: boolean;
}
