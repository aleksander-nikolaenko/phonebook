import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { routesPaths } from 'routerSettings/routesPaths';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          pt: 3,
          pb: 3,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Phonebook
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            It is very convenient, simple and fast, because all the reference
            information is collected in one place. The advantage of this
            telephone directory is that in a fairly short time you will be able
            to find the numbers you need.
          </Typography>
          <Stack
            sx={{ pt: 1 }}
            direction="row"
            spacing={5}
            justifyContent="center"
          >
            <Button
              sx={{ width: '120px' }}
              onClick={() =>
                navigate(routesPaths.registerPage, { replace: true })
              }
              variant="contained"
            >
              REGISTER
            </Button>
            <Button
              sx={{ width: '120px' }}
              onClick={() => navigate(routesPaths.loginPage, { replace: true })}
              variant="outlined"
            >
              LOGIN
            </Button>
          </Stack>
        </Container>
      </Box>
    </main>
  );
}
