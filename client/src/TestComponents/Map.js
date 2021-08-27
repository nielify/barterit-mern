import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import useRemoveCover from '../CustomHooks/useRemoveCover';

const useStyles = makeStyles((theme) => ({

}));

const Map = () => {
  useRemoveCover();
  const classes = useStyles();


  return (
    <Container maxWidth="md">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
}

export default Map;