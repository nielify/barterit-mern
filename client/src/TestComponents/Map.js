import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import useRemoveCover from '../CustomHooks/useRemoveCover';

import { io } from "socket.io-client";

const useStyles = makeStyles((theme) => ({

}));

const Map = () => {
  useRemoveCover();
  const classes = useStyles();
  
  const [ socket, setSocket ] = useState(null);
  const [ position, setPosition ] = useState([0,0]);
  const [ markers, setMarkers ] = useState([]);

  useEffect(() => {  
    //alert(`Reminder: In order for this feature to function properly, you must turn on your mobile device's GPS, Location permission for the browser(ie. Chrome, Safari, Firefox, etc.) you are using, and allow this website to access your location when prompt `);
    const myPosition = navigator.geolocation.watchPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);  
    }, error => console.log(error), { enableHighAccuracy: true });
    
    return () => {
      navigator.geolocation.clearWatch(myPosition);
    }
  }, []);

  useEffect(() => {
    const newSocket = io(`${process.env.REACT_APP_SERVER_DOMAIN}`);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.on('marker', (arg) => {
        setMarkers(oldMarkers => [...oldMarkers, arg]);
      })
    });
    
  }, []);

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
          <Marker position={marker} key={i}>
          </Marker>
        )) }
        <MapClick setMarkers={setMarkers} socket={socket} />
        <ChangeMapView coords={position} />
      </MapContainer>
    </Container>
  );
}

const MapClick = ({ setMarkers, socket }) => {
  const map = useMapEvents({
    click(e) {
      setMarkers(oldMarkers => [...oldMarkers, [e.latlng.lat, e.latlng.lng]]);
      socket.emit('marker', [e.latlng.lat, e.latlng.lng]);
    }
  })
  return null;
}

function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

export default Map;