import './App.css';
import Home from './component/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import Admin from './component/Admin';
import Userpage from './component/Userpage';
import CreateUser from './component/admincomponent/CreateUser';
import NewRequest from './component/admincomponent/NewRequest';
import Navbar from './component/Navbar';
import Apply from './component/usercomponent/Apply';
import RequestStatus from './component/usercomponent/RequestStatus';
import ProtectedRoute from './component/ProtectRoutes';
import UserData from './context/UserData';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar'
function App() {
  const location = useLocation();
  const[progress,setProgress] = useState(0)
  return (
    <>
      <UserData>
      <div>
        {location.pathname.startsWith('/admin') && <Navbar setProgress={setProgress}/>}
        {location.pathname.startsWith('/user') && <Navbar setProgress={setProgress}/>}
        <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
          <Route exact path="/" element={<Home  setProgress={setProgress}/>}></Route>
          <Route exact path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>}>
          </Route>
          <Route exact path="/user" element={
            <ProtectedRoute>
              <Userpage />
            </ProtectedRoute>}></Route>
          <Route exact path="/admin/createuser" element={<ProtectedRoute>
              <CreateUser setProgress={setProgress}/>
            </ProtectedRoute>}></Route>
          <Route exact path="/admin/newrequest" element={<ProtectedRoute>
              <NewRequest setProgress={setProgress}/>
            </ProtectedRoute>}></Route>
          <Route exact path="/user/apply" element={<ProtectedRoute>
              <Apply setProgress={setProgress}/>
            </ProtectedRoute>}></Route>
          <Route exact path="/user/requestStatus" element={<ProtectedRoute>
              <RequestStatus setProgress={setProgress}/>
            </ProtectedRoute>}></Route>
        </Routes>
      </div>
      </UserData>
    </>
  );
}
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
