import {Box, Button, Menu, MenuItem} from '@mui/material';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectLogoutError, selectLogoutLoading, unsetUser} from '../../../Features/users/UsersSlice';
import {logout} from '../../../Features/users/UsersThunk';
import {User} from '../../../types';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const logoutError = useAppSelector(selectLogoutError);
  const navigation = useNavigate();
  const logoutLoading = useAppSelector(selectLogoutLoading);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    if (logoutError === null && !logoutLoading) {
      dispatch(unsetUser());
    }
  };


  return (
    <>
      <Box>
        <Button
          onClick={handleClick}
          className="text-white"
        >
          Hello, {user.displayName}
        </Button>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem><Button onClick={() => navigation('/new-item')}>Add new item</Button></MenuItem>
          <MenuItem><Button onClick={handleLogout}>Log out</Button></MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default UserMenu;

