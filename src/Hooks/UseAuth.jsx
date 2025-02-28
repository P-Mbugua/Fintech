import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext"; // Import AuthContext correctly

export const useAuth = () => {
  return useContext(AuthContext);
};
