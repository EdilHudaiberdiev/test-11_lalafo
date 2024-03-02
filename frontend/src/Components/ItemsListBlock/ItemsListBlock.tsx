import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {useAppSelector} from '../../app/hooks';
import {apiUrl} from '../../constants';
import {selectItems, selectItemsLoading} from '../../Features/items/ItemsSlice';
import Spinner from '../UI/Spinner/Spinner';
import NoPostImage from '../../assets/test-image.jpg';

const ItemsListBlock = () => {
  const items = useAppSelector(selectItems);
  const itemsLoading = useAppSelector(selectItemsLoading);

  console.log(items);
  return (
    <>
      {itemsLoading.get ? <Spinner/> :
        <>
          {items.length === 0 ? <p>No items yet</p> :
            <>
              {items.map(item => (
                <NavLink  key={item._id} className="col text-decoration-none text-black" to={`/items/${item._id}`}>
                  <Card className="mb-4 border">
                    <CardMedia
                      sx={{height: 140}}
                      image={item.image ? apiUrl + item.image : NoPostImage}
                      title={item._id}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.price} SOM
                      </Typography>
                    </CardContent>
                  </Card>
                </NavLink>
              ))}
            </>
          }
        </>
      }
    </>
  );
};

export default ItemsListBlock;