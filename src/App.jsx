import { BrowserRouter as Router,Switch, Route} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path={["/", "/home"]}>
            <Home/>
          </Route>

          <Route path={["/register"]}>
            <Register/>
          </Route>

          <Route path={["/login"]}>
            <Login/>
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;

