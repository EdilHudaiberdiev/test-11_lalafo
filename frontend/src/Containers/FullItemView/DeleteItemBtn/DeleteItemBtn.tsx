import React from 'react';
import {IItem, User} from '../../../types';

interface Props{
  item: IItem;
  user: User | null;
  deleteItem: (id: string) => void;
}
const DeleteItemBtn: React.FC<Props> = ({user, deleteItem, item}) => {
  return (
    <>
      {user?._id === item.user._id
        ? <button onClick={() => deleteItem(item._id)} className="btn btn-danger">Delete</button>
        : null
      }
    </>
  );
};

export default DeleteItemBtn;