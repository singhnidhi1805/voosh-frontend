import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Sidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawer = (
    <div>
      <List sx={{ bgcolor: '#2c2c3e', color: '#fff' }}>
        <ListItem button onClick={() => navigate('/profile')} sx={{ '&:hover': { bgcolor: '#1f1f2e' } }}>
          <ListItemIcon sx={{ color: '#ffcc00' }}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => navigate('/dashboard')} sx={{ '&:hover': { bgcolor: '#1f1f2e' } }}>
          <ListItemIcon sx={{ color: '#ffcc00' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#2c2c3e', // Darker background for sidebar
          borderRight: '1px solid #424242',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
