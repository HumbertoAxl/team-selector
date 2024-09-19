import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Header from './components/Header';
import TeamSelector from './components/TeamSelector';
import { Box, Divider } from '@mui/material/';

export default function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundImage: `url('/assets/futsal-background.png')`,
        minWidth: '375px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}>
      <Card
        elevation={15}
        sx={{
          width: { xs: '90vw', sm: '80vw', md: '70vw', lg: '35vw' },
          height: '640px',
        }}>
        <Header />
        <Divider sx={{ mx: 2 }} />
        <CardContent>
          <TeamSelector />
        </CardContent>
      </Card>
    </Box>
  );
}
