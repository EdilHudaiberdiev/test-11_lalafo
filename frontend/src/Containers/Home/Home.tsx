import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {AppDispatch} from '../../app/store';
import {selectCategories} from '../../Features/categories/CategoriesSlice';
import {getCategories} from '../../Features/categories/CategoriesThunk';
import SideBar from '../SideBar/Sidebar';


const Home = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  const queryString = useLocation().search;


  useEffect(() => {
    if (categories?.length === 0) {
      dispatch(getCategories());
    }

  }, [dispatch, queryString]);


  return (
    <div className="container">
      <div className="row justify-content-between">
        <SideBar/>

        <div className="col col-md-9">
          <h1>All items</h1>

        </div>
      </div>
    </div>
  );
};

export default Home;