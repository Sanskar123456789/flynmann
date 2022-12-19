import './App.css';
import PrimeReact from 'primereact/api';
import Login from './components/Login';
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import AddTopic from './components/AddTopic';
import Edit from './components/Edit';
import { useSelector } from 'react-redux';
import { ProgressBar } from 'primereact/progressbar';

PrimeReact.autoZIndex = true;
PrimeReact.inputStyle = 'filled';
PrimeReact.ripple = true;
//----------------- imports and import settings--------------------


function App() {
  const auth = useSelector((state)=>state.user.Auth) // tells the user is authenticated or not
  const loading = useSelector((state)=>state.user.loading) // tells the does any loading is going or not
  
  return (
      <Router>
        <div className="App">
          {
          loading
          // if loading is true than progressbar will shown
          ?<ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>         
          // elsewe can ser our pages
          :
            <Routes>
              {/* Login route */}
              <Route  path="/" element={<Login/>} />
              {/* Dashboard route with condition of auth */}
              <Route  path="/dashboard" element={
                // If authenticated than only we can see dashboard else login
                auth && !loading ?<Dashboard/>:<Login/>
              } />
              {/* Topic route with condition of auth */}
              <Route  path="/topic" element={
              // If authenticated than only we can see dashboard else login
              auth && !loading ?<AddTopic/>:<Login/>
            } />
            {/* Edit Topic route with condition of auth */}
              <Route  path="/editTopic" element={
                // If authenticated than only we can see dashboard else login
                auth && !loading ?<Edit/>:<Login/>
              } />
            </Routes> 
          }
        </div>
      </Router>
  );
}

export default App;
