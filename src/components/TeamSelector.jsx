import { useMemo, useRef, useState } from 'react';
import { colors, shuffle, PLAYERS_PER_TEAM } from '../constants';
import Header from './Header';
import Content from './Content';
import Actions from './Actions';

const TeamSelector = () => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [setupComplete, setSetupComplete] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [revealedTeam, setRevealedTeam] = useState(null);
  const [pendingTeam, setPendingTeam] = useState(null);
  const [battlePhase, setBattlePhase] = useState(null); // null | 'shaking' | 'resolving'
  const [fromBattle, setFromBattle] = useState(false);

  const battleTimers = useRef([]);

  const teamsReady = Boolean(team1 && team2);
  const isFinished = currentPlayer >= 10;

  const selectedTeams = useMemo(
    () => [team1, team2].map((t) => colors.find((c) => c.value === t)).filter(Boolean),
    [team1, team2],
  );

  const handleReveal = () => {
    let draw = assignments;
    if (!draw.length) {
      draw = shuffle([
        ...Array(PLAYERS_PER_TEAM).fill(team1),
        ...Array(PLAYERS_PER_TEAM).fill(team2),
      ]);
      setAssignments(draw);
    }
    const winner = colors.find((c) => c.value === draw[currentPlayer]);
    setPendingTeam(winner);
    setBattlePhase('shaking');
    battleTimers.current = [
      setTimeout(() => setBattlePhase('resolving'), 500),
      setTimeout(() => {
        setRevealedTeam(winner);
        setBattlePhase(null);
        setPendingTeam(null);
        setFromBattle(true);
      }, 1380),
    ];
  };

  const handlePass = () => {
    setRevealedTeam(null);
    setFromBattle(false);
    setCurrentPlayer((p) => p + 1);
  };

  const handleReset = () => {
    battleTimers.current.forEach(clearTimeout);
    battleTimers.current = [];
    setTeam1('');
    setTeam2('');
    setSetupComplete(false);
    setAssignments([]);
    setCurrentPlayer(0);
    setRevealedTeam(null);
    setPendingTeam(null);
    setBattlePhase(null);
    setFromBattle(false);
  };

  return (
    <div className="team-selector">
      <Header
        showReset={setupComplete}
        onReset={handleReset}
      />
      <Content
        setupComplete={setupComplete}
        team1={team1}
        team2={team2}
        selectedTeams={selectedTeams}
        battlePhase={battlePhase}
        pendingTeam={pendingTeam}
        revealedTeam={revealedTeam}
        fromBattle={fromBattle}
        currentPlayer={currentPlayer}
        isFinished={isFinished}
        assignments={assignments}
        setTeam1={setTeam1}
        setTeam2={setTeam2}
      />
      <Actions
        setupComplete={setupComplete}
        teamsReady={teamsReady}
        battlePhase={battlePhase}
        revealedTeam={revealedTeam}
        fromBattle={fromBattle}
        isFinished={isFinished}
        currentPlayer={currentPlayer}
        onStartReveal={() => setSetupComplete(true)}
        onReveal={handleReveal}
        onPass={handlePass}
        onReset={handleReset}
      />
    </div>
  );
};

export default TeamSelector;
