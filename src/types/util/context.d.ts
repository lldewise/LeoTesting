export type AuthContext = Readonly<{
  isAuthenticated: boolean;
  principal: any;
  login: () => void;
  logout: () => void;
}>;
