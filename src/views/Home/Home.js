import { useHistory } from "react-router-dom";
import AppHeader from "../../Components/AppHeader/AppHeader";
import FancyButton from "../../Components/FancyButton/FancyButton";
import { useAuth } from "../../hooks/useAuth";
import ProtectedPage from "./Components/ProtectedPage/ProtectedPage";
import "./Home.scss";

export default function Home() {
  const { loginWithGithub, loginWithGoogle, userState } = useAuth();
  const history = useHistory();

  return (
    <ProtectedPage>
      <div className="HomeWrapper">
        <AppHeader>
          {userState === null && (
            <>
              <FancyButton text="Google Login" onClick={loginWithGoogle} />
              <FancyButton text="Github Login" onClick={loginWithGithub} />
            </>
          )}
          {userState !== null && (
            <FancyButton
              text="Open App →"
              onClick={() => history.push("/app/dashboard")}
            />
          )}
        </AppHeader>
      </div>
    </ProtectedPage>
  );
}
