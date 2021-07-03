import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Vistas
import Notes from "./views/Notes";
import AddNote from "./views/Note";
import EditNote from "./views/EditNote"
import Login from "./views/Login";
import Home from "./views/Home";
import Register from "./views/Register";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserContextProvider, { UserContext } from "./context/UserContextProvider";
import ViewNote from './views/ViewNote';
import ErrorBoundary from './components/ErrorBoundary';

// Componente principal de la aplicación.
const App = () => {
  return <section aria-labelledby="hook-counter" aria-describedby="hook-counter-desc">
    <ErrorBoundary message="Algo ha salido mal">
      <UserContextProvider>
        <Router>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/notes">
            <Notes />
          </Route>
          <Route path="/addNote">
            <AddNote />
          </Route>
          <Route path="/editNote">
            <EditNote />
          </Route>
          <Route path="/viewNote/:id">
            <ViewNote />
          </Route>
        </Router>
      </UserContextProvider>
    </ErrorBoundary>
  </section >
};

export default App;
