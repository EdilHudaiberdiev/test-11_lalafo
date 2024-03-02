import {useAppSelector} from '../../app/hooks';
import CategoriesMenu from '../../Components/CategoriesMenu/CategoriesMenu';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {selectCategories, selectCategoriesLoading} from '../../Features/categories/CategoriesSlice';

const SideBar = () => {
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);

  return (
    <aside className="col col-md-2">
      {categoriesLoading
        ? <Spinner/>
        : <CategoriesMenu categories={categories}/>
      }
    </aside>
  );
};

export default SideBar;