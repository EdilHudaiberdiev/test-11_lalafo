import {Card, CardContent, Typography} from '@mui/material';
import React from 'react';
import NoPostImage from '../../../assets/test-image.jpg';
import {apiUrl} from '../../../constants';
import {IItem, User} from '../../../types';
import DeleteItemBtn from '../DeleteItemBtn/DeleteItemBtn';

interface Props {
  item: IItem;
  user: User | null;
  deleteItem: (id: string) => void;
}
const FullPostItem: React.FC<Props> = ({item, user, deleteItem}) => {
  return (
    <Card key={item._id} className="mb-4 border text-start p-3">
      <img
        className="mx-auto d-block"
        width="200"
        src={item.image ? apiUrl + item.image : NoPostImage}
        alt={item._id}
      />
      <hr/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </Typography>
        <Typography variant="body2" color="text.secondary" className="fs-3" component="div">
          {item.price} SOM
          <hr/>
          <h6 className="mt-1 text-black">Saler: {item.user.displayName} - {item?.user.phone}</h6>

          <DeleteItemBtn item={item} deleteItem={deleteItem} user={user}/>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FullPostItem;