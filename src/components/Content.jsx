import { colors, PLAYER_COUNT } from '../constants';

const LockIcon = () => (
  <svg className="swatch-lock" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
);

const TeamPicker = ({ label, value, unavailableValue, onChange }) => (
  <div className="team-picker" role="group" aria-label={label}>
    <span className="picker-label">{label}</span>
    <div className="colour-options">
      {colors.map((color) => {
        const isSelected = value === color.value;
        const isUnavailable = unavailableValue === color.value;
        return (
          <button
            key={color.value}
            type="button"
            className={`colour-swatch${isSelected ? ' is-selected' : ''}${color.light ? ' is-light' : ''}`}
            style={{ '--swatch': color.value }}
            onClick={() => onChange(color.value)}
            disabled={isUnavailable}
            aria-label={`${label}: ${color.label}`}
            aria-pressed={isSelected}
            title={isUnavailable ? `${color.label} (taken by the other team)` : color.label}
          >
            {isSelected && <span className="swatch-check" aria-hidden="true">✓</span>}
            {isUnavailable && <LockIcon />}
          </button>
        );
      })}
    </div>
  </div>
);

const Progress = ({ currentPlayer, isFinished }) => {
  const activePlayer = Math.min(currentPlayer + 1, PLAYER_COUNT);
  return (
    <div className="progress-block">
      <div className="progress-copy">
        <span>{isFinished ? 'Done' : `Player ${activePlayer} of ${PLAYER_COUNT}`}</span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="Players sorted"
        aria-valuemin="0"
        aria-valuemax={PLAYER_COUNT}
        aria-valuenow={isFinished ? PLAYER_COUNT : currentPlayer}
      >
        <span style={{ width: `${(isFinished ? PLAYER_COUNT : currentPlayer + 1) * 10}%` }} />
      </div>
    </div>
  );
};

const Content = ({
  setupComplete,
  team1, team2,
  selectedTeams,
  battlePhase, pendingTeam,
  revealedTeam, fromBattle,
  currentPlayer, isFinished,
  assignments,
  setTeam1, setTeam2,
}) => (
  <div className="app-body">
    {!setupComplete ? (
      <section className="setup-screen" aria-label="Choose team colours">
        <h2>Choose team colours</h2>
        <p className="setup-subtitle">
          Pick one colour for each team, then pass the phone around so each player can reveal their side.
        </p>
        <div className="setup-team-rows">
          <TeamPicker label="Team 1" value={team1} unavailableValue={team2} onChange={setTeam1} />
          <TeamPicker label="Team 2" value={team2} unavailableValue={team1} onChange={setTeam2} />
        </div>
        <div className="setup-hint">
          <span className="hint-icon" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          </span>
          <p><strong>Next:</strong> each player taps to reveal their team</p>
        </div>
      </section>
    ) : (
      <div className="draw-screen">
        <Progress currentPlayer={currentPlayer} isFinished={isFinished} />

        <section className="draw-stage" aria-live="polite">
          {!revealedTeam && !isFinished && !battlePhase && (
            <div className="ready-state">
              <h2>Player {currentPlayer + 1}</h2>
              <div className="team-preview" aria-label={`${selectedTeams[0]?.label} versus ${selectedTeams[1]?.label}`}>
                <span
                  className={selectedTeams[0]?.light ? 'light-team' : ''}
                  style={{ backgroundColor: selectedTeams[0]?.value }}
                />
                <em>vs</em>
                <span
                  className={selectedTeams[1]?.light ? 'light-team' : ''}
                  style={{ backgroundColor: selectedTeams[1]?.value }}
                />
              </div>
            </div>
          )}

          {battlePhase && (() => {
            const resolving = battlePhase === 'resolving';
            const team1Wins = pendingTeam?.value === selectedTeams[0]?.value;
            return (
              <div className="battle-state">
                <div className={`battle-arena${resolving ? ' is-resolving' : ''}`}>
                  <div
                    className={`battle-chip chip-left${
                      !resolving ? ' is-shaking' :
                      team1Wins  ? ' is-winner' : ' chip-exit-left'
                    }${selectedTeams[0]?.light ? ' is-light' : ''}`}
                    style={{ backgroundColor: selectedTeams[0]?.value }}
                  />
                  <span className={`battle-vs${resolving ? ' is-exiting' : ''}`}>vs</span>
                  <div
                    className={`battle-chip chip-right${
                      !resolving ? ' is-shaking' :
                      team1Wins  ? ' chip-exit-right' : ' is-winner'
                    }${selectedTeams[1]?.light ? ' is-light' : ''}`}
                    style={{ backgroundColor: selectedTeams[1]?.value }}
                  />
                </div>
                {resolving && (
                  <div
                    className={`battle-flood${team1Wins ? ' from-left' : ' from-right'}`}
                    style={{ backgroundColor: pendingTeam.value }}
                  />
                )}
              </div>
            );
          })()}

          {revealedTeam && (
            <div
              className={`reveal-state${revealedTeam.light ? ' is-light' : ''}${fromBattle ? ' from-battle' : ''}`}
              style={{ '--team-colour': revealedTeam.value, '--team-text': revealedTeam.text }}
            >
              <div className="reveal-shine" aria-hidden="true" />
              <span className="reveal-player">Player {currentPlayer + 1}</span>
              <p>You are on</p>
              <h2>{revealedTeam.label}</h2>
            </div>
          )}

          {isFinished && (
            <div className="finished-state">
              <h2>Overview</h2>
              <ul className="player-list" aria-label="Players and their team colours">
                {assignments.map((teamValue, i) => {
                  const team = colors.find((c) => c.value === teamValue);
                  return (
                    <li key={i}>
                      <span
                        className={`player-list-swatch${team?.light ? ' is-light' : ''}`}
                        style={{ backgroundColor: team?.value }}
                        aria-hidden="true"
                      />
                      <span className="player-list-name">Player {i + 1}</span>
                      <span className="player-list-team">{team?.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>
      </div>
    )}
  </div>
);

export default Content;
