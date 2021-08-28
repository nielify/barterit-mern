import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
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
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude])
      /* console.log(pos.coords); */
      /* setPosition([pos.coords.latitude, pos.coords.longitude]); */
      /* console.log(pos.coords.latitude);
      console.log(pos.coords.longitude); */
    }, error => console.log(error), { enableHighAccuracy: true })
  }, [position]);

  return (
    <Container maxWidth="md">
      <MapContainer center={[14.609053699999997, 121.02225650000001]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
}

export default Map;