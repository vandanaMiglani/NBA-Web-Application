import "./styles.css";
import Home from "./homeComponent";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop>
          <Switch>
            <Route path="/" component={Home} />
            <Redirect to="/home" />
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}
