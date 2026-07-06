export const PLAYER_COUNT = 10;
export const PLAYERS_PER_TEAM = PLAYER_COUNT / 2;

export const colors = [
  { value: '#E84040', label: 'Red',    text: '#FFFFFF' },
  { value: '#F59010', label: 'Orange', text: '#FFFFFF' },
  { value: '#4060E0', label: 'Blue',   text: '#FFFFFF' },
  { value: '#0F9040', label: 'Green',  text: '#FFFFFF' },
  { value: '#FFFFFF', label: 'White',  text: '#171A19', light: true },
];

export const shuffle = (items) => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
