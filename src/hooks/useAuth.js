import { useContext } from "react";
import { AuthContext } from "../Context/context";

export function useAuth() {
  return useContext(AuthContext);
}
