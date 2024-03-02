import {Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import {useAppSelector} from './app/hooks';
import Toolbar from './Components/UI/Toolbar/Toolbar';
import AddNewItem from './Containers/AddNewItem/AddNewItem';
import FullItemView from './Containers/FullItemView/FullItemView';
import Home from './Containers/Home/Home';
import Login from './Features/users/Login/Login';
import Register from './Features/users/Register/Register';
import {selectUser} from './Features/users/UsersSlice';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main className="mt-5">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/items/:id" element={<FullItemView/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/new-item" element={user ? <AddNewItem/> : <Navigate to='/login' />}/>
          <Route path="*" element={(<h1>Not found</h1>)}/>
        </Routes>
      </main>

    </>
  );
};

export default App;