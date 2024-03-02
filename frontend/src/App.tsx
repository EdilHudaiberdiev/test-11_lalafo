import {Route, Routes} from 'react-router-dom';
import './App.css';
import Toolbar from './Components/UI/Toolbar/Toolbar';
import Home from './Containers/Home/Home';
import Login from './Features/users/Login/Login';
import Register from './Features/users/Register/Register';

const App = () => {

  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main className="mt-5">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={(<h1>Not found</h1>)}/>
        </Routes>
      </main>

    </>
  );
};

export default App;