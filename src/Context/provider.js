import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./context";
import { useStoreActions } from "easy-peasy";
import supabase from "../supabase/supabase-config";
import { parseUserData } from "../Utils/User";

export function AuthProvider({ children }) {
  const [userState, setUserState] = useState(
    parseUserData(supabase.auth.user())
  );
  const [status, setStatus] = useState(
    supabase.auth.user() === null ? "loading" : "ready"
  );

  const setUser = useStoreActions((action) => action.setUser);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        const supaUser = supabase.auth.user();
        console.log(event);
        setUserState(supaUser);
        setStatus("ready");
        setUser(supaUser);
      }

      if (event === "SIGNED_OUT") {
        setUserState(null);
        setStatus("loading");
      }
    });
  });

  useEffect(() => {
    window.onhashchange = () => {
      checkUser();
    };
  }, []);

  async function checkUser() {
    const supaUser = parseUserData(supabase.auth.user());
    setUserState(supaUser);

    if (supaUser) {
      setStatus("ready");
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    setUserState(null);
  }

  async function loginWithGithub() {
    await supabase.auth.signIn({
      provider: "github",
    });
  }

  async function loginWithGoogle() {
    await supabase.auth.signIn({
      provider: "google",
    });
  }

  const authObject = {
    loginWithGithub,
    loginWithGoogle,
    logout,
    userState,
    status,
  };

  return (
    <AuthContext.Provider value={authObject}>{children}</AuthContext.Provider>
  );
}
AuthProvider.defaultProps = {
  children: null,
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
