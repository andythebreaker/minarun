import logo from './logo.svg';
import './App.css';
import { Online, Offline } from 'react-detect-offline';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
           <div>不管有沒有網路都會顯示的內容</div>
           <Online>有網路時會顯示的內容</Online>
           <Offline>離線時會顯示的內容</Offline>
       </div>
      </header>
    </div>
  );
}

export default App;
