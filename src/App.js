import Dashboard from './components/Dashboard.js';
import Preferences from './components/Preferences.js';
import Login from './components/Login/Login.js';
import {
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
    navigate("../", { replace: true });
    localStorage.clear()
    window.location.reload();
  }

  return(
    <button onClick={handleLogout}>Logout</button>
  )
}

export default function App() {

  const { userToken, setUserToken } = useToken();
  let navigate = useNavigate();

  if (!userToken) {
    return <Login setUserToken={setUserToken} />
  }

  function handleLogout() {
    navigate("../", { replace: true });
    localStorage.clear()
    window.location.reload();
  }

  const activityTracker = () => {
    let oldTokenString = localStorage.getItem('token');
    let token = JSON.parse(oldTokenString)?.token;
    let oldExpiry = JSON.parse(oldTokenString)?.expiry;
    let timeNow = new Date().getTime();
    if (timeNow > oldExpiry + 10000) {
      alert('Logged out for inactivity')
      handleLogout()
    } else {
      let tokenString = JSON.stringify({
        'token': token,
        'expiry': new Date().getTime() + 10000
      })
      localStorage.setItem('token', tokenString)
    }
  }

  return (
      <div onClick={activityTracker} className="wrapper">
        <h1>Application</h1>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/preferences">Preferences</Link>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/preferences" element={<Preferences />} />
          </Routes>
          <Logger />
      </div>
  );
}
