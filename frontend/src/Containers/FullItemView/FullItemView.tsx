import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {AppDispatch} from '../../app/store';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {cleanItem, selectItem, selectItemsLoading} from '../../Features/items/ItemsSlice';
import {deleteItemById, getOneItemById} from '../../Features/items/ItemsThunk';
import {selectUser} from '../../Features/users/UsersSlice';
import FullPostItem from './FullPostCard/FullPostItem';

const FullItemView = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const params = useParams();
  const navigation = useNavigate();
  const user = useAppSelector(selectUser);
  const item = useAppSelector(selectItem);
  const itemsLoading = useAppSelector(selectItemsLoading);

  useEffect(() => {
    dispatch(cleanItem());
    if (params.id) {
      dispatch(getOneItemById(params.id));
    }
  }, [dispatch, params.id]);

  const deleteItem = async (id: string) => {
    try {
      await dispatch(deleteItemById(id));
      navigation('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      {itemsLoading?.get ? <Spinner/> :
        <>
          {item !== null ?
            <FullPostItem deleteItem={deleteItem} item={item} user={user}/>
            :
            <p>Not found</p>
          }
        </>
      }
    </div>
  );
};

export default FullItemView;