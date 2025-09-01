import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./components/UserProfile";
import PublicRoute from "./pages/PublicRoute";
import PrivateRoute from "./pages/PrivateRoute";


function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={true} exact path="/" component={Login} />
        <PublicRoute restricted={false} exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/profile" component={UserProfile}/>
      </Switch>
    </Router>
  );
}

export default App;
