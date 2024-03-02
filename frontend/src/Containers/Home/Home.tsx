import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {AppDispatch} from '../../app/store';
import ItemsListBlock from '../../Components/ItemsListBlock/ItemsListBlock';
import {selectCategories} from '../../Features/categories/CategoriesSlice';
import {getCategories} from '../../Features/categories/CategoriesThunk';
import {getItems, getItemsByCategory} from '../../Features/items/ItemsThunk';
import SideBar from '../SideBar/Sidebar';



const Home = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const params = new URLSearchParams(document.location.search);
  const categories = useAppSelector(selectCategories);

  const queryString = useLocation().search;


  useEffect(() => {
    if (categories?.length === 0) {
      dispatch(getCategories());
    }

    if (queryString !== '') {
      dispatch(getItemsByCategory(String(params.get('category'))));
    } else {
      dispatch(getItems());
    }
  }, [dispatch, queryString]);


  return (
    <div className="container">
      <div className="row justify-content-between">
        <SideBar/>

        <div className="col col-md-9">
          <h1>All items</h1>
          <div className="row row-cols-1 row-cols-md-3 justify-content-between">
            <ItemsListBlock />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;