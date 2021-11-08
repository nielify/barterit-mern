import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, useMapEvents, CircleMarker } from 'react-leaflet';

import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from "@material-ui/lab/Alert";

import { UserContext } from '../../../Context/UserContext';

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
    //padding: theme.spacing(4, 4,),
    borderRadius: 10,
    width: 'auto',
    height: 'auto',
    position: 'relative',
  },
  main: {
    margin: theme.spacing(2.5,4,4,4),
    width: '90vw',
    maxWidth: 500
  },
  waiting: {
    margin: theme.spacing(2.5,4,4,4),
    width: '90vw',
    maxWidth: 500
  },
  suggested: {
    margin: theme.spacing(2.5,4,4,4),
    width: '90vw',
    maxWidth: 500
  },
  mapContainer: {
    height: 250
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16
  },
  successMessage: {
    width: '90vw',
    maxWidth: '350px'
  },
  loader: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const MeetingPlace = ({ open, setOpen, negotiation }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useContext(UserContext);

  const [myPosition, setMyPosition] = useState([0, 0]);
  const [meetingPlacePosition, setMeetingPlacePosition] = useState([0, 0]);
  const [address, setAddress] = useState('');

  //waiting map state
  const [suggestedMeetingPos, setSuggestedMeetingPos] = useState([0,0]);
  const [suggestedAddress, setSuggestedAddress] = useState('');

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);
  const [showSuggested, setShowSuggested] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showAgreeMessage, setShowAgreeMessage] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/negotiation/${negotiation._id}`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);

        if (!data.meetingPlace.type) {
          setShowMain(true);
        }
        else if (data.meetingPlace.type === 'suggestion') {
          setSuggestedMeetingPos(data.meetingPlace.latlng);
          setSuggestedAddress(data.meetingPlace.location);
          if (data.meetingPlace.from === user._id) {
            setShowWaiting(true);
          }
          else {
            setShowSuggested(true);
          }
        }
        else if (data.meetingPlace.type === 'accepted') {
          history.push(`/map/${negotiation._id}`);
        }
      })
      .catch(err => console.log(err));

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
    setSubmitting(true);

    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/negotiation/meetingplace`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        negotiation_id: negotiation._id,
        from: user._id,
        latlng: meetingPlacePosition,
        location: address
      })
    });

    const data = await res.json();

    console.log(data);
    setSubmitting(false);
    setShowMain(false);
    setShowSuccessMessage(true);
  }

  const handleSuggestAnotherLocation = () => {
    setShowSuggested(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowMain(true);
    }, 500);
  }

  const handleAgree = async () => {
    setLoading(true);
    setShowSuggested(false);

    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/negotiation/meetingplace/agree`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        negotiation_id: negotiation._id,
      })
    });
    const data = await res.json();

    if (data.meetingPlace.type === 'accepted') {
      setLoading(false);
      setShowAgreeMessage(true);
    }
  }

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      disableEnforceFocus
    >
      <div className={classes.paper}>

        {/* main meetingplace interface */}
        {showMain && <div className={classes.main}>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
            Suggest a meeting location
          </Typography>
          <Divider />
          <Typography
            variant="subtitle1"
            style={{ marginTop: 8, marginBottom: 16, fontSize: '.85rem', lineHeight: '1.2rem' }}
          >
            Tap a location on the map that you want to be your meeting place. After submitting, the location will be seen by <b>{negotiation.owner._id !== user._id ? negotiation.owner.firstName : negotiation.notOwner.firstName}</b> and will decide to accept it or suggest a different one.
          </Typography>

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
            style={{ fontSize: '.8rem', lineHeight: '.9rem', marginTop: 8, height: 30, overflow: 'visible' }}
          >
            {address}
          </Typography>

          <div className={classes.buttons}>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: 16 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitMeetingPlace}
              disabled={!address || submitting}
              endIcon={submitting ? <CircularProgress size={20} /> : null}
            >
              {submitting ? 'Submitting' : 'Submit'}
            </Button>
          </div>
        </div>}
        {/* end of main meetingplace interface */}

        {/* waiting meetingplace interface */}
        {showWaiting && <div className={classes.waiting}>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
            Meeting Place
          </Typography>
          <Divider />
          <Typography
            variant="subtitle1"
            style={{ marginTop: 8, marginBottom: 8, fontSize: '.85rem', lineHeight: '1.2rem' }}
          >
            Waiting for response..<br/><br/>
            <b style={{fontSize: '.8rem'}}>You suggested this meeting place</b>
          </Typography>

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

              <CircleMarker center={suggestedMeetingPos} radius={20} pathOptions={{ color: '#009688' }}>
                <Popup>
                  Selected meeting place
                </Popup>
              </CircleMarker>

              {/* map reposition event */}
              <MapView coords={suggestedMeetingPos} />
            </MapContainer>
          </div>

          <Typography
            variant="body1"
            style={{ fontSize: '.8rem', lineHeight: '.9rem', marginTop: 8, height: 30, overflow: 'visible' }}
          >
            {suggestedAddress}
          </Typography>

          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              style={{minWidth: 100}}
            >
              Close
            </Button>
          </div>

        </div>}
        {/* end of waiting meetingplace interface */}

        {/* Suggested meetingplace interface */}
        {showSuggested && <div className={classes.suggested}>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
            Meeting Place
          </Typography>
          <Divider />
          <Typography
            variant="subtitle1"
            style={{ marginTop: 8, marginBottom: 8, fontSize: '.85rem', lineHeight: '1.2rem' }}
          >
            <b>{negotiation.owner._id !== user._id ? negotiation.owner.firstName : negotiation.notOwner.firstName}</b> suggested a meeting place. You can agree or select a new one if you think you cannot go to this location. <br/><br/>
            <b style={{fontSize: '.8rem'}}> Suggested meeting place</b>
          </Typography>

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

              <CircleMarker center={suggestedMeetingPos} radius={20} pathOptions={{ color: '#009688' }}>
                <Popup>
                  Selected meeting place
                </Popup>
              </CircleMarker>

              {/* map reposition event */}
              <MapView coords={suggestedMeetingPos} />
            </MapContainer>
          </div>

          <Typography
            variant="body1"
            style={{ fontSize: '.8rem', lineHeight: '.9rem', marginTop: 8, height: 30, overflow: 'visible' }}
          >
            {suggestedAddress}
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: 16 }}
              onClick={handleSuggestAnotherLocation}
            >
              Suggest another location
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAgree}
              disabled={submitting}
              endIcon={submitting ? <CircularProgress size={20} /> : null}
            >
              Agree
            </Button>
          </div>

        </div>}
        {/* End of Suggested meetingplace interface */}

        {showSuccessMessage && <Alert severity="success" className={classes.successMessage}>
          Meeting Place location request has been submitted. Please wait for <b>{user._id != negotiation.owner._id ? negotiation.owner.firstName : negotiation.notOwner.firstName}</b> to respond.
        </Alert>}
        {loading && <div className={classes.loader}>
          <CircularProgress size={50} />
        </div>}
        {showAgreeMessage && <Alert severity="success" className={classes.successMessage}>
          You have agreed to a meeting place suggested by <b>{user._id != negotiation.owner._id ? negotiation.owner.firstName : negotiation.notOwner.firstName}</b>. You can click the map icon again to enter the map.
        </Alert>}
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
      setAddress('');

      setPosition([e.latlng.lat, e.latlng.lng]);

      fetch(GEOCODE_URL + `${e.latlng.lng},${e.latlng.lat}`)
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