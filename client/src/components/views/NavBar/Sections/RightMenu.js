/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Badge } from 'antd';
import {ShoppingCartOutlined} from '@ant-design/icons';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get('/api/users/logout')
        .then((response) => {
            if (response.data.success) {
                props.history.push('/login');
                window.location.reload();
            }
            else
                alert("로그아웃 실패");
        });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="signin">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="signup">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="cart">
          <Badge count={5}style = {{marginTop:15}}>
            <a href="/cart" ><ShoppingCartOutlined style = {{fontSize:25, marginTop:15}}/></a>
          </Badge>
        </Menu.Item>
        <Menu.Item key="upload">
          <a href="/upload">Upload</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

