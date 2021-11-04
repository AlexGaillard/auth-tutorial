import Dashboard from './components/Dashboard.js';
import Preferences from './components/Preferences.js';
import Login from './components/Login/Login.js';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import "./App.css";
import useToken from './useToken';

export default function App() {

  const { userToken, setUserToken } = useToken();

  if (!userToken) {
    return <Login setUserToken={setUserToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
      </Router>
    </div>
  );
}
