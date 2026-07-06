import TeamSelector from './components/TeamSelector';
import './App.css';

export default function App() {
  return (
    <main className="app-shell">
      <section className="selector-panel" aria-label="Futsal team selector">
        <TeamSelector />
      </section>
    </main>
  );
}
