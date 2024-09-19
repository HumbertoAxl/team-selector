import { useState } from 'react';
import {
  Button,
  Typography,
  Divider,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CardActions,
  Grow,
} from '@mui/material';

const colors = [
  { value: '#f70000', label: 'Red' },
  { value: '#f7a000', label: 'Orange' },
  { value: '#103bff', label: 'Blue' },
  { value: '#00a300', label: 'Green' },
  { value: '#ffffff', label: 'White' },
];

const TeamSelector = () => {
  const [players, setPlayers] = useState(Array(10).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [team1Count, setTeam1Count] = useState(0);
  const [team2Count, setTeam2Count] = useState(0);

  const handlePlayerDraft = () => {
    if (currentPlayer < 10 && team1 && team2) {
      const newTeam =
        Math.random().toFixed(1) >= 0.5 ? (team1Count < 5 ? team1 : team2) : team2Count < 5 ? team2 : team1;

      if (newTeam === team1) {
        setTeam1Count((prevCount) => prevCount + 1);
      } else {
        setTeam2Count((prevCount) => prevCount + 1);
      }

      const newPlayers = [...players];
      newPlayers[currentPlayer] = newTeam;
      setPlayers(newPlayers);
      setCurrentPlayer(currentPlayer + 1);
    }
  };

  const handleTeamChange = (teamSetter) => (event) => {
    teamSetter(event.target.value);
  };

  return (
    <Box sx={{ textAlign: 'left' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <FormControl sx={{ width: '45%' }}>
          <InputLabel id="team1-label">Team 1</InputLabel>
          <Select labelId="team1-label" value={team1} onChange={handleTeamChange(setTeam1)} label="Team 1">
            {colors.map((color) => (
              <MenuItem key={color.value} value={color.value} disabled={color.value === team2}>
                {color.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography>vs</Typography>
        <FormControl sx={{ width: '45%' }}>
          <InputLabel id="team2-label">Team 2</InputLabel>
          <Select labelId="team2-label" value={team2} onChange={handleTeamChange(setTeam2)} label="Team 2">
            {colors.map((color) => (
              <MenuItem key={color.value} value={color.value} disabled={color.value === team1}>
                {color.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Box sx={{ textAlign: 'center', height: '410px', alignContent: 'center' }}>
          {!(team1 && team2) ? (
            <Typography>Select the teams colors</Typography>
          ) : (
            <>
              {players.map((team, index) => {
                const teamLabel = colors.find((color) => color.value === team)?.label || ''; // I know this is not pretty, will be fixed in a later release lol
                return (
                  <Grow in={Boolean(team)} key={`player${index}`} timeout={200}>
                    {/* Should have used a <List> */}
                    <Box backgroundColor={team} sx={{ borderRadius: '20px', mt: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: team === '#ffffff' ? 'black' : 'white',
                          outline: team === '#ffffff' && '1px solid black',
                          borderRadius: 'inherit',
                        }}>
                        {currentPlayer - 1 === index ? (
                          <>👉 You will play for {teamLabel}s 👈</>
                        ) : (
                          <>Player {index + 1}</>
                        )}
                      </Typography>
                    </Box>
                  </Grow>
                );
              })}
            </>
          )}
        </Box>
        <Divider sx={{ mt: 1 }} />
        <CardActions sx={{ justifyContent: 'center', mt: 1 }}>
          {currentPlayer < 10 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handlePlayerDraft}
              disabled={!team1 || !team2 || team1Count + team2Count === 10}>
              Draft Player
            </Button>
          ) : (
            <Typography variant="h6" textAlign="center">
              Done!
            </Typography>
          )}
        </CardActions>
      </Box>
    </Box>
  );
};

export default TeamSelector;
