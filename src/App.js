import { StoreProvider } from "easy-peasy";
import { AuthProvider } from "./Context/provider";
import Router from "./router";
import Store from "./Store/Store";

export default function App() {
  return (
    <StoreProvider store={Store}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </StoreProvider>
  );
}
