//import logo from './logo.svg';
import './App.css';
import { Online, Offline } from 'react-detect-offline';
import Demo from './Demo.js';
//import { Float } from '@headlessui-float/react'
import 'semantic-ui-css/semantic.min.css';
//import { Card } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MySwal = withReactContent(Swal);

var wtf = MySwal.fire({
  title: <p>此應用程式為預覽版，開發者不對使用者所產生的任何後果負責。使用者應該自行審慎評估應用程式的功能和風險，並自負所有風險及責任。我們強烈建議使用者小心使用此應用程式，並盡可能避免在生產環境中使用。使用此應用程式的風險完全由使用者自行承擔。</p>,
  didOpen: () => {
    // `MySwal` is a subclass of `Swal` with all the same instance & static methods
    MySwal.showLoading()
  },
}).then(() => {
  return MySwal.fire(<p>Shorthand works too</p>)
});

function App() {

  const notify = () => { toast("Wow so easy!"); console.log("???"); };

  return (
    <div className="App">
      <Fab
        //mainButtonStyles={mainButtonStyles}
        //actionButtonStyles={actionButtonStyles}
        //style={style}
        icon={<FontAwesomeIcon icon={icon({ name: 'bars' })} />}
        event={'click'}
        alwaysShowTitle={true}
        onClick={null}
      >
        <Action
          text="Email"
          onClick={wtf}
        ><FontAwesomeIcon icon={icon({ name: 'key' })} /> </Action>
        <Action
          text="Help"
          onClick={wtf}
        >
          <FontAwesomeIcon icon={icon({ name: 'user-secret' })} />  </Action>
      </Fab>
      <div className="network-indicator">
        <div>不管有沒有網路都會顯示的內容</div>
        <Online>有網路時會顯示的內容</Online>
        <Offline>離線時會顯示的內容</Offline>
      </div>
      <Demo></Demo>
      <ToastContainer />
    </div>
  );
}

export default App;
