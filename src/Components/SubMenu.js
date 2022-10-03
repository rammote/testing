import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
  
const SidebarNavLink = styled(NavLink)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 50px;
  text-decoration: none;
  font-size: 15px;
  
  &:hover {
    background: #0C428187;
    border-left: 4px solid white;
    cursor: pointer;
  }
`;
  
const SidebarLabel = styled.span`
  margin-left: 16px;
`;
  
const DropdownNavLink = styled(NavLink)`
  background: #0C428187;
  height: 50px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 15px;
 
  &:hover {
    background: #0C428187;
    cursor: pointer;
  }
`;
  
const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  
  const showSubnav = () => setSubnav(!subnav);
  
  return (
    <>
      <SidebarNavLink to={item.path && item.path}   activeClassName={item.defActive?"active":""}
      onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarNavLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <div style={{ marginLeft:"-1rem"}}>
              <DropdownNavLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownNavLink>
            </div>
          );
        })}
    </>
  );
};
  
export default SubMenu;