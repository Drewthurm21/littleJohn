import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutBtn = styled.div`
  color: var(--eerie-black);
  text-decoration: none;
  border-radius: 3px;
  height: 100%;
  width: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3px;

  &:hover {
    border-bottom: 3px solid #00cf98;
    -webkit-box-shadow: 0 6px 4px -4px #00cf98;
    -moz-box-shadow: 0 6px 4px -4px #00cf98;
    box-shadow: 0 px 4px -4px #00cf98;
  }

  &.active {
    text-decoration: underline;
  }
`

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => await dispatch(logout());
  return <LogoutBtn onClick={onLogout}>Logout</LogoutBtn>;
};

export default LogoutButton;
