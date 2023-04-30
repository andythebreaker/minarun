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

const MySwal = withReactContent(Swal);

var wtf=MySwal.fire({
  title: <p>Hello World</p>,
  didOpen: () => {
    // `MySwal` is a subclass of `Swal` with all the same instance & static methods
    MySwal.showLoading()
  },
}).then(() => {
  return MySwal.fire(<p>Shorthand works too</p>)
});

function App() {
  return (
    <div className="App">
      <Fab
  //mainButtonStyles={mainButtonStyles}
  //actionButtonStyles={actionButtonStyles}
  //style={style}
  icon={<FontAwesomeIcon icon={icon({name: 'space-station-moon'})} />}
  //event={event}
  alwaysShowTitle={true}
  onClick={wtf}
>
  <Action
    text="Email"
    onClick={wtf}
  ><FontAwesomeIcon icon={icon({name: 'key'})} /> </Action>
  <Action
      text="Help"
      onClick={wtf}
    >
<FontAwesomeIcon icon={icon({name: 'user-secret'})} />  </Action>
</Fab>
        <div className="net-work-ind">
           <div>不管有沒有網路都會顯示的內容</div>
           <Online>有網路時會顯示的內容</Online>
           <Offline>離線時會顯示的內容</Offline>
       </div>
<Demo></Demo>
    </div>
  );
}

export default App;
