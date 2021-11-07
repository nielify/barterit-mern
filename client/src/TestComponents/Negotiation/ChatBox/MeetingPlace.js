import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, useMapEvents, CircleMarker } from 'react-leaflet';

import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const GEOCODE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 4,),
    borderRadius: 10,
    maxWidth: 400,
    height: 'auto',
  },
  mapContainer: {
    height: 250
  }, 
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16
  }
}));

const MeetingPlace = ({ open, setOpen }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const [myPosition, setMyPosition] = useState([0, 0]);
  const [meetingPlacePosition, setMeetingPlacePosition] = useState([0, 0]);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setMyPosition([pos.coords.latitude, pos.coords.longitude]);
        setMeetingPlacePosition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
    else {
      alert('This feature is not supported on your device');
      handleClose();
    }
  }, []);

  const handleSubmitMeetingPlace = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/negotiation/meetingplace`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    
    const data = await res.json();

    console.log(data);
  }

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      disableEnforceFocus
    >
      <div className={classes.paper}>
        <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
          Suggest a meeting location
        </Typography>
        <Divider />
        <Typography
          variant="subtitle1"
          style={{ marginTop: 8, marginBottom: 16, fontSize: '.85rem', lineHeight: '1.2rem' }}
        >
          Tap a location on the map that you want to be your meeting place. The location will be seen by user-firstname and will decide to accept it or suggest a different one.
        </Typography>
        {/* <Typography
          variant="subtitle1"
          style={{ marginTop: 8, marginBottom: 8, fontSize: '.76rem', lineHeight: '1.2rem' }}
        >
          Tip: Zoom in first before tapping to accurately select the location of the meeting place.
        </Typography> */}

        <div className={classes.mapContainer}>
          <MapContainer
            center={myPosition}
            zoom={18}
            minZoom={14}
            maxZoom={18}
            scrollWheelZoom={true}
            style={{ cursor: 'pointer' }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={myPosition}>
              <Popup>
                You are here!
              </Popup>
            </Marker>
            <CircleMarker center={meetingPlacePosition} radius={20} pathOptions={{ color: '#009688' }}>
              <Popup>
                Selected meeting place
              </Popup>
            </CircleMarker>

            {/* map reposition event */}
            <MapView coords={meetingPlacePosition} />
            <GetPositionOnClick setPosition={setMeetingPlacePosition} setAddress={setAddress} />

          </MapContainer>
        </div>

        <Typography
          variant="body1"
          style={{ fontSize: '.8rem', lineHeight: '.9rem', marginTop: 8 }}
        >
          {address}
        </Typography>

        <div className={classes.buttons}>
          <Button
            variant="outlined"
            color="primary"
            style={{marginRight: 16}}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitMeetingPlace}
          >
            Submit
          </Button>
        </div>
        
      </div>
    </Modal>
  );
}

function MapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

const GetPositionOnClick = ({ setPosition, setAddress }) => {

  const map = useMapEvents({
    click: (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      
      fetch(GEOCODE_URL+`${e.latlng.lng},${e.latlng.lat}`)
        .then(res => res.json())
        .then(data => {
          const addressLabel = (data.address !== undefined) ? data.address.LongLabel : "Unknown Location";
          setAddress(addressLabel);
        })
        .catch(err => console.log(err));
    },
  })

  return null
  /* return (
      selectedPosition ? 
          <Marker           
          key={selectedPosition[0]}
          position={selectedPosition}
          interactive={false} 
          />
      : null
  )    */
}


export default MeetingPlace;