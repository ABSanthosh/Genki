import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as views from "./views";
import React from "react";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={views.Home} />
        <ProtectedRoute path="/app/dashboard" component={views.Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}