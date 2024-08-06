import AdminChatMenu from "./AdminChatMenu";
import Home from "./Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/*dmin_ch@t">
        <AdminChatMenu />
      </Route>
    </Router>
  );
}

export default App;

//  <Route exact path="/">
//         <Home />
//       </Route>
//       <Route exact path="/Category">
//         <Category />
//       </Route>
//       <Route exact path="/Settings">
//         <Settings />
//       </Route>
//       <Route exact path="/Product/:id">
//         <Product />
//       </Route>
//       <Route exact path="/Login">
//         <Login />
//       </Route>
