import React from 'react';
import {NavLink} from 'react-router-dom';
import {ICategory} from '../../../types';

interface Props {
  category: ICategory;
}
const CategoryItem: React.FC<Props> = ({category}) => {
  return (
    <li><NavLink to={`?category=${category._id}`}>{category.title}</NavLink></li>
  );
};

export default CategoryItem;