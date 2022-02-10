import './App.css';
import Footer from './components/footer/Footer';
import DrinkWaterGame from './components/drink-water-game/DrinkWaterGame';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div>
          <DrinkWaterGame></DrinkWaterGame>
        </div>
        <div className="container-footer">
        </div>
      </div>
    </div>
  );
}

export default App;
