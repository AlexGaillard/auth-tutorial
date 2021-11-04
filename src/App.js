import Dashboard from './components/Dashboard.js';
import Preferences from './components/Preferences.js';
import Login from './components/Login/Login.js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate
} from 'react-router-dom'
import "./App.css";
import useToken from './useToken';

function Logger() {
  let navigate = useNavigate();

  function handleLogout() {
    localStorage.clear()
    navigate("../", { replace: true });
    window.location.reload();
  }

  return(
    <button onClick={handleLogout}>Logout</button>
  )
}

export default function App() {

  const { userToken, setUserToken } = useToken();

  if (!userToken) {
    return <Login setUserToken={setUserToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <Router>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/preferences">Preferences</Link>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
        <Logger />
      </Router>
    </div>
  );
}
