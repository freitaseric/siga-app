export interface UserClaims {
  sector: "gestao" | "credito" | "administrativo";
  position: string;
  permissions: string[];
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  claims: UserClaims;
}
