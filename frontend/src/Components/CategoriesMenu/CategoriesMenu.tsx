import React from 'react';
import {NavLink} from 'react-router-dom';
import {ICategory} from '../../types';
import CategoryItem from './CategoryItem/CategoryItem';

interface Props {
  categories: ICategory[];
}
const CategoriesMenu: React.FC<Props> = ({categories}) => {
  return (
    <>
      {categories?.length > 0 ?
        <ul className="text-start">
          <li><NavLink to="/">All</NavLink></li>
          {categories?.map(category => (
            <CategoryItem key={category._id} category={category}/>
          ))}
        </ul>
        :
        <p>No one category</p>
      }
    </>
  );
};

export default CategoriesMenu;