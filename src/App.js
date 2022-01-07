import logo from './logo.svg';
import './App.css';
import Footer from './components/footer/Footer';
import Bathroom from './components/bathroom/Bathroom';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="container-bathroom">
          <Bathroom></Bathroom>
        </div>
        <div className="container-footer">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default App;
