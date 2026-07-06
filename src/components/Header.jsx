const Header = ({ showReset, onReset }) => {
  return (
    <header className="app-header">
      <div className="brand-mark" aria-hidden="true">
        <img src="/assets/soccer-ball.svg" alt="" />
      </div>

      <div className="brand-copy">
        <h1>Team Selector</h1>
      </div>

      {showReset && (
        <button className="reset-button" type="button" onClick={onReset} aria-label="Reset team draw">
          <span aria-hidden="true">{'↻'}</span>
        </button>
      )}
    </header>
  );
};

export default Header;
