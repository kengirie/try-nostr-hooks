import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

export default function Footer() {
  return (
     <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        position: 'relative',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" align="center">
          My Company
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Something here to describe the company.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Link color="primary" href="#" sx={{ mx: 1 }}>
            企業情報
          </Link>
          <Link color="primary" href="#" sx={{ mx: 1 }}>
            FAQ
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
