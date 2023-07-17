import './App.css';
import ReadTextFile from './context/ReadTextFile';
import Compressor from './Compressor';
import Nav from './Nav';
import Footer from './Footer/Footer';

function App() {
  return (
    <>
      <div className="App">
        <Nav />
        <ReadTextFile>
          <Compressor />
        </ReadTextFile>
        <Footer />
      </div>
    </>
  );
}

export default App;
