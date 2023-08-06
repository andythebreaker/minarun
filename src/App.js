//import logo from './logo.svg';
import React, { useState } from 'react';
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
import { useAudio } from '../modules/react-music-hook/index.js';
//import song from './assets/songs.mp3';
//import db
import { DBConfig } from './DBConfig';
import { initDB } from 'react-indexed-db-hook';
import localForage from 'localforage';
import { calculateDataVolume } from './unit/JSONvolume';
import { convertJsonToGpx } from './unit/json2gpx';

import preval from 'babel-plugin-preval/macro';//import {wtfMACRO} from '../babel-plugin-transform-use-audio-src.macro';

initDB(DBConfig);

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

const fetchData = async () => {
  try {
    const dataKeys = await localForage.keys();
    const dataItems = await Promise.all(
      dataKeys.map((key) => localForage.getItem(key))
    );

    // Display the data using SweetAlert
    Swal.fire({
      title: 'Local Database',
      html: `<pre>the gpx data volume:${calculateDataVolume(dataItems)}</pre>`,
      icon: 'info',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Download(JSON)',
      cancelButtonText: 'Download(GPX)',
    }).then((result) => {
      if (result.isConfirmed) {
        downloadData(dataItems);
      } else if (result.isDismissed) {
        downloadDataGpx(dataItems[0]);
      }
    });
  } catch (error) {
    // Handle any error that occurs
    Swal.fire({
      title: 'Error! Failed to fetch data from local database',
      text: String(error),//TODO:生產環境安全錯誤
      icon: 'error',
    });
  }
};

const downloadData = (data) => {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'local-database.json';
  link.click();
};

const downloadDataGpx = (data) => {
  const gpxData = convertJsonToGpx(data);
  const blob = new Blob([gpxData], { type: 'application/gpx+xml' }); // Use GPX MIME type
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'run.gpx';
  link.click();
};


function App() {
  const { isPlaying, play, pause, toggle } = useAudio(/*wtfMACRO(*/{
    src: preval`
    const fs = require('fs')
  module.exports = fs.readFileSync(require.resolve('./greeting.txt'), 'utf8')
    `,//"./assets/songs.mp3",
 loop: true,
  });//);

  const notify = () => { toast("Wow so easy!"); console.log("???"); };

  const [myValue, setMyValue] = useState(true);//HighAccuracy=true

  const handleChange = (event) => {
    setMyValue((myValue === true) ? false : true);
  }

  const show_db = (event) => {
    fetchData();
  }

  const [watchPositionCtrl, setWatchPositionCtrl] = useState(true);

  const handleWatchPositionCtrl = (event) => {
    setWatchPositionCtrl((watchPositionCtrl === true) ? false : true);
  }

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
      //------------
      //don't change this!!!
      //------------
      >
        <Action
          text="show db"
          onClick={show_db}
        >
          <FontAwesomeIcon icon={icon({ name: 'database' })} />
        </Action>
        <Action
          text="HighAccuracy"
          onClick={handleChange}
        >
          {myValue ? (
            <FontAwesomeIcon icon={icon({ name: 'map-location-dot' })} />
          ) : (
            <FontAwesomeIcon icon={icon({ name: 'location-dot' })} />
          )}
        </Action>
        <Action
          text="WatchPosition"
          onClick={handleWatchPositionCtrl}
        >
          {watchPositionCtrl ? (
            <FontAwesomeIcon icon={icon({ name: 'location-arrow' })} />
          ) : (
            <FontAwesomeIcon icon={icon({ name: 'map-pin' })} />
          )} </Action>
      </Fab>
      <div className="network-indicator">
        <div>不管有沒有網路都會顯示的內容</div>
        <button onClick={toggle}>{isPlaying ? "Pause" : "Play"}</button>
        <Online>有網路時會顯示的內容</Online>
        <Offline>離線時會顯示的內容</Offline>
      </div>
      <Demo myValue={myValue} watchPositionCtrl={watchPositionCtrl}></Demo>
      <ToastContainer />
    </div>
  );
}

export default App;
