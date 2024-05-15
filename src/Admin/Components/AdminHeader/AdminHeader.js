import React, { useState } from 'react';
import { Menu, MenuItem, styled, Box, Hidden } from '@mui/material';
import 
{ BsJustify, BsSearch}
from 'react-icons/bs'
import { Link  } from 'react-router-dom';

import {
    Home,
    Person,
    Settings,
    PowerSettingsNew
} from "@mui/icons-material";
// import "./Header.scss"
const UserMenu = styled(Box)({
    padding: 4,
    display: "flex",
    justifyContent: "flex-end",
    borderRadius: 24,
    cursor: "pointer",
    alignItems: "center",
    "& span": { margin: "0 8px" }
});
const StyledItem = styled(MenuItem)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    minWidth: 185,
    "& a": {
        width: "100%",
        display: "flex",
        alignItems: "center",
        textDecoration: "none"
    },
    "& span": { marginRight: "10px", color: theme.palette.text.primary }
}));
function AdminHeader({OpenSidebar}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>

            <UserMenu 
                onClick={handleClick}>
                <Hidden xsDown>
                    <span>
                        Hi <strong>abc</strong>
                    </span>
                </Hidden>
            </UserMenu>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledItem>
                <Link to="/" style={{color:"black"}}>
                    <Home />
                    <span>Trang chủ</span>
                </Link>
                </StyledItem>

                <StyledItem>
                {/* <Link to="/page-layouts/user-profile"> */}
                    <Person />
                    <span>Thông tin</span>
                {/* </Link> */}
                </StyledItem>

                <MenuItem>
                    <Settings />
                    <span>Cài đặt</span>
                </MenuItem>

                <StyledItem onClick={handleClose}>
                    <PowerSettingsNew />
                    <span>Đăng xuất</span>
                </StyledItem>
            </Menu>
            
    </header>
    
            
            
        
    )
}

export default AdminHeader