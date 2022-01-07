import logo from './logo.svg';
import './App.css';
import Footer from './components/footer/Footer';
import Panel from './components/panel/Panel';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="container-panel">
          <Panel></Panel>
        </div>
        <div className="container-footer">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default App;
