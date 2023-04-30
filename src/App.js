//import logo from './logo.svg';
import './App.css';
import { Online, Offline } from 'react-detect-offline';
import Demo from './Demo.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
<Demo></Demo>
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
