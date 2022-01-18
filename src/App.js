import { useStoreRehydrated } from "easy-peasy";
import { AuthProvider } from "./Context/provider";
import Router from "./router";

export default function App() {
  const isRehydrated = useStoreRehydrated();
  return (
    <AuthProvider>
      {isRehydrated ? <Router /> : <div>Loading...</div>}
    </AuthProvider>
  );
}
