import React, { useEffect } from 'react'
import './App.css';
import Login from './Components/Login';
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from './Components/Player';
import { useDataLayerValue } from "./Components/DataLayer";//data retrive from DataLayer

const spotify = new SpotifyWebApi();

function App() {

  //const [token, setToken] = useState(null);     // direct login for developing player page
  const [{ user, token }, dispatch] = useDataLayerValue();


  useEffect(() => {
    const hash = getTokenFromUrl(); // object
    window.location.hash = "" ;   // hide token for security purpose
    const tokenUrl = hash.access_token;  // only taken access_token from the obj
    
    if (tokenUrl) {
      dispatch({
        type: "SET_TOKEN",
        token: tokenUrl,
      });
      console.log("[token]", token);
      spotify.setAccessToken(tokenUrl);

      //checking that we have got the access to the SpotifyWebApi or not
       spotify.getMe().then( (user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
         console.log("🎅",user)
         console.log("👩",token)
       })
    }
    spotify.getUserPlaylists().then((playlists) => {
      dispatch({
        type: "SET_PLAYLISTS",
        playlists: playlists,
      });
    });
    spotify.getPlaylist("37i9dQZEVXcGnkbAbklYt5").then((playlist) => {
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: playlist,
      });
    });
   
    // console.log("I have got the token", hash)
  }, []);

  return (
    <div className="App">
    {
      token ? ( <Player spotify={spotify} /> ) : ( <Login /> )
    }
      
    </div>
  );
}

export default App;
// 37i9dQZEVXcGnkbAbklYt5