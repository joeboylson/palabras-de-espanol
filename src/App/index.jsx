import { BrowserRouter as Router,Switch, Route} from "react-router-dom";
import Admin from "../Admin";
import Home from "../Home";
import Login from "../Login";
import ProtectedRoute from "../ProtectedRoute";
import Register from "../Register";
import { NotificationContainer } from 'react-notifications';


import './style.scss';

const App = () => {
  return (
    <Router>
      <main>
        
        <Switch>
          <Route exact path={["/register"]}>
            <Register/>
          </Route>

          <Route exact path={["/login"]}>
            <Login/>
          </Route>

          <Route exact path={"/admin"}>
            <ProtectedRoute>
              <Admin/>
            </ProtectedRoute>
          </Route>

          <Route exact path={["/", "/home"]}>
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          </Route>
        </Switch>

        <NotificationContainer/>
      </main>
    </Router>
  );
}

export default App;

