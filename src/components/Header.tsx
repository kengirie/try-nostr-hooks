import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  useScrollTrigger,
  Slide,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useActiveUser } from 'nostr-hooks';
import { UserIcon } from './UserIcon';
import { LoginButton } from './LoginButton';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import MenuIcon from '@mui/icons-material/Menu';

// スクロール時にヘッダーを隠すための関数コンポーネント
function HideOnScroll(props: { children: React.ReactElement }) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export const Header = () => {
  const { activeUser } = useActiveUser();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // 現在のパスに基づいてアクティブなリンクを判定
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // ナビゲーションリンク
  const navLinks = [
    { text: 'ホーム', path: '/', icon: <HomeIcon /> },
    { text: '概要', path: '/about', icon: <InfoIcon /> },
    { text: 'チャンネル', path: '/channel', icon: <ForumIcon /> }
  ];

  // モバイル用ドロワーの内容
  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'primary.main',
        color: 'white'
      }}>
        <Typography variant="h6" component="div" sx={{ my: 1 }}>
          Nostrアプリ
        </Typography>
      </Box>
      <Divider />
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.path} disablePadding>
            <ListItemButton
              component={Link}
              to={link.path}
              selected={isActive(link.path)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'rgba(25, 118, 210, 0.08)',
                  '&:hover': {
                    bgcolor: 'rgba(25, 118, 210, 0.12)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{
                color: isActive(link.path) ? 'primary.main' : 'inherit'
              }}>
                {link.icon}
              </ListItemIcon>
              <ListItemText
                primary={link.text}
                primaryTypographyProps={{
                  fontWeight: isActive(link.path) ? 'bold' : 'regular',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        {activeUser ? <UserIcon /> : <LoginButton />}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={1}
          sx={{
            bgcolor: 'white',
            color: 'text.primary',
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Container maxWidth="lg">
            <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Nostrアプリ
              </Typography>

              {/* デスクトップ用ナビゲーション */}
              {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {navLinks.map((link) => (
                    <Button
                      key={link.path}
                      component={Link}
                      to={link.path}
                      startIcon={link.icon}
                      sx={{
                        mx: 1,
                        color: isActive(link.path) ? 'primary.main' : 'text.primary',
                        fontWeight: isActive(link.path) ? 'bold' : 'medium',
                        borderBottom: isActive(link.path) ? '2px solid' : '2px solid transparent',
                        borderColor: isActive(link.path) ? 'primary.main' : 'transparent',
                        borderRadius: 0,
                        pb: 0.5,
                        '&:hover': {
                          bgcolor: 'transparent',
                          borderBottom: '2px solid',
                          borderColor: 'primary.light',
                        },
                        textTransform: 'none'
                      }}
                    >
                      {link.text}
                    </Button>
                  ))}
                  <Box sx={{ ml: 2 }}>
                    {activeUser ? <UserIcon /> : <LoginButton />}
                  </Box>
                </Box>
              )}

              {/* モバイル用メニューボタン */}
              {isMobile && (
                <>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                    sx={{ ml: 1 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                      keepMounted: true, // モバイルでのパフォーマンス向上のため
                    }}
                  >
                    {drawer}
                  </Drawer>
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </Box>
  );
};
