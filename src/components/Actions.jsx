import { PLAYER_COUNT } from '../constants';

const Actions = ({
  setupComplete,
  teamsReady,
  battlePhase,
  revealedTeam,
  fromBattle,
  isFinished,
  currentPlayer,
  onStartReveal,
  onReveal,
  onPass,
  onReset,
}) => {
  const isLastPlayer = currentPlayer === PLAYER_COUNT - 1;

  return (
    <div className={`app-actions${fromBattle ? ' from-battle' : ''}`}>
      {!setupComplete && (
        <button
          className="continue-button"
          type="button"
          disabled={!teamsReady}
          onClick={onStartReveal}
        >
          Start team reveal
          <span className="continue-arrow" aria-hidden="true">›</span>
        </button>
      )}

      {setupComplete && !battlePhase && !revealedTeam && !isFinished && (
        <button className="primary-button" type="button" onClick={onReveal}>
          <span>Sort your team</span>
          <span className="button-arrow" aria-hidden="true">→</span>
        </button>
      )}

      {setupComplete && battlePhase && (
        <div className="app-actions-placeholder" aria-hidden="true" />
      )}

      {revealedTeam && (
        <button className="pass-button" type="button" onClick={onPass}>
          {isLastPlayer ? 'Finish' : 'Sort next player'}
          <span className="button-arrow" aria-hidden="true">→</span>
        </button>
      )}

      {isFinished && (
        <button className="secondary-button" type="button" onClick={onReset}>
          Start again
        </button>
      )}
    </div>
  );
};

export default Actions;
