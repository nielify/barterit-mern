import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import useRemoveCover from '../CustomHooks/useRemoveCover';

const useStyles = makeStyles((theme) => ({

}));

const Map = () => {
  useRemoveCover();
  const classes = useStyles();
  
  const [position, setPosition] = useState([0,0]);

  useEffect(() => {  
    const myPosition = navigator.geolocation.watchPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);  
    }, error => console.log(error), { enableHighAccuracy: true });
    
    return () => {
      navigator.geolocation.clearWatch(myPosition);
    }
  }, []);

  return (
    <Container maxWidth="md">
      <MapContainer center={position} zoom={15} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <ChangeMapView coords={position} />
      </MapContainer>
    </Container>
  );
}

function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

export default Map;