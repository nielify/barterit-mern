import { useEffect, useState, useContext, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { UserContext } from '../Context/UserContext'
import useRequireAuth from '../CustomHooks/useRequireAuth';

import { io } from "socket.io-client";

const useStyles = makeStyles((theme) => ({

}));

const Map = () => {
  useRequireAuth()
  const classes = useStyles();
  
  //logged in user
  const [ user, setUser ] = useContext(UserContext);

  //socket
  const [ socket, setSocket ] = useState(null);

  //positions
  const positionRef = useRef([0,0]);
  const [ position, setPosition ] = useState([0,0]);
  const [ markers, setMarkers ] = useState([]);

  //notif
  const [ notifOpen, setNotifOpen ] = useState(false);
  const [ name, setName ] = useState(null);

  useEffect(() => {
    let myPosition;

    if (Object.keys(user).length !== 0) {
      const newSocket = io(`${process.env.REACT_APP_SERVER_DOMAIN}`);
      setSocket(newSocket);
      
      newSocket.on("connect", () => { 
        setNotifOpen(true);
        newSocket.emit('newUser', user);

        myPosition = navigator.geolocation.watchPosition((pos) => { 
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          positionRef.current = [pos.coords.latitude, pos.coords.longitude];
          
          newSocket.emit('locationUpdate', { 
            id: user._id,
            name: user.firstName + ' ' + user.lastName,
            position: positionRef.current
          });

        }, error => console.log(error), { enableHighAccuracy: true }); 

        
      }); 

      //when new other use joins
      newSocket.on('newUser', (mapUser) => {
        if (mapUser.id !== user._id) {
          setName(mapUser.name);
          setNotifOpen(true);
          /* setMarkers(oldMarkers => [...oldMarkers, {
            id: user._id,
            name: user.firstName + ' ' + user.lastName,
            location: [  ]
          }]); */
        }
      });

      //when other users position updates]
      newSocket.on('locationUpdate', update => {
        setMarkers(prevMarkers => {  
          let updated = false;
          prevMarkers.forEach(prevMarker => {
            if (prevMarker.id === update.id) {
              prevMarker.position = update.position;
              updated = true;
            } 
          });
          if (updated) return prevMarkers;
          else return [...prevMarkers, update];
        });  
      });

    }

    return () => navigator.geolocation.clearWatch(myPosition);
  }, [user]);


  return (
    <Container maxWidth="md">
      <MapContainer 
        center={position}
        zoom={15} 
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            You are here!
          </Popup>
        </Marker>
        { markers.map((marker, i )=> (
          <Marker position={marker.position} key={i}>
            <Popup>
              { marker.name } is here!
            </Popup>
          </Marker>
        )) }
        {/* <MapClick setMarkers={setMarkers} socket={socket} /> */}
        <ChangeMapView coords={position} />
        <Notification notifOpen={notifOpen} setNotifOpen={setNotifOpen} name={name} setName={setName} />
      </MapContainer>
      <h5>People in this map:</h5>
      <ul>
        {markers.map(marker => (
          <li key={marker.id}>{marker.name}</li>
        ))}
      </ul>
    </Container>
  );
}

/* const MapClick = ({ setMarkers, socket }) => {
  const map = useMapEvents({
    click(e) {
      setMarkers(oldMarkers => [...oldMarkers, [e.latlng.lat, e.latlng.lng]]);
      socket.emit('marker', [e.latlng.lat, e.latlng.lng]);
    }
  })
  return null;
} */

function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}



function Notification({ notifOpen, setNotifOpen, name, setName }) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotifOpen(false);
    setName(null);
  }; 

  return (
    <Snackbar 
      open={notifOpen} 
      autoHideDuration={3000} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      style={{marginTop: 50, marginRight: 15}}
    >
      <Alert severity="info">
        { name ? `${name} has joined the map!` : 'You joined the map!' }
      </Alert>
    </Snackbar>
  )
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default Map;