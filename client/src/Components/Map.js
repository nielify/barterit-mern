import { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, useMapEvents, CircleMarker } from 'react-leaflet';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import { UserContext } from '../Context/UserContext';
import useRequireAuth from '../CustomHooks/useRequireAuth';

import { io } from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 64px - 54px)',
    position: 'relative',
    overflow: 'hidden'
  },
  people: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 999,
    padding: '12px 0',
    paddingLeft: 32,
    borderRadius: 5,
    background: 'rgba(0,0,0,.75)',
    bottom: 190,
    right: 10,
    width: 220,
    //height: 70,
    transform: 'translateX(102%)',
    transition: 'transform 0.3s ease-out',
  },
  arrowIconPeople: {
    borderRadius: '50%',
    background: '#009688',
    position: 'absolute',
    top: 'calc(50% - 20px)',
    left: -30,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 16,
    borderRadius: 5,
    background: 'rgba(0,0,0,.75)',
    width: 220,
    //height: 120,
    position: 'absolute',
    zIndex: 999,
    bottom: 25,
    right: 10,
    transform: 'translateX(102%)',
    transition: 'transform 0.3s ease-out',
  },
  buttonsOpen: {
    transform: 'translateX(0%)',
  },
  arrowIcon: {
    borderRadius: '50%',
    background: '#009688',
    position: 'absolute',
    top: 'calc(50% - 20px)',
    left: -30,
  }, 
}));

const Map = (props) => {
  useRequireAuth();
  const classes = useStyles();
  const params = useParams();

  const [negotiation, setNegotiation] = useState({});

  //socket
  const socketRef = useRef();

  //window height
  const heightRef = useRef(window.innerHeight);
  const [height, setHeight] = useState(heightRef.current);

  useEffect(() => {
    console.log(Boolean(negotiation.meetingPlace))
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/negotiation/${params.id}`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => setNegotiation(data))
    .catch(err => console.log(err));

    window.addEventListener('resize', () => {
      setHeight(window.innerHeight)
    });

    return () => {
      window.removeEventListener('resize', () => {});
      if (socketRef.current) socketRef.current.disconnect();
    }
  },[]);

  //logged in user
  const [user, setUser] = useContext(UserContext);

  //positions
  const positionRef = useRef([0, 0]);
  const [position, setPosition] = useState([0, 0]);
  const [markers, setMarkers] = useState([]);
  const markersRef = useRef([]);

  //center map view
  const [currentView, setCurrentView] = useState([0,0]);
  const currentViewEntRef = useRef('self');
  const [showCurrentView, setShowCurrentView] = useState(true);
  //const [currentViewIsOtherUser, setCurrentViewIsOtherUser] = useState(false);

  //notif
  const [infoNotifOpen, setInfoNotifOpen] = useState(false);
  const [successNotifOpen, setSuccessNotifOpen] = useState(false);
  const [disconNotificationOpen, setDisconNotificationOpen] = useState(false);
  const [name, setName] = useState(null);

  //collapse
  const [ collapseButtons, setCollapseButtons ] = useState(false);
  const [ collapsePeople, setCollapsePeople ] = useState(false);
  
  const handleCollapseButtons = () => {
    setCollapseButtons(!collapseButtons);
  }
  
  const handleCollapsePeople = () => {
    setCollapsePeople(!collapsePeople);
  }

  useEffect(() => {
    let myPosition;

    if (Object.keys(user).length !== 0) {
      //create socket connection instance
      const newSocket = io(`${process.env.REACT_APP_SERVER_DOMAIN}`); 
      socketRef.current = newSocket;

      //get self initial position
      //notificate self
      //emit join-room event
      if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {      
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          positionRef.current = [pos.coords.latitude, pos.coords.longitude];
          setCurrentView([pos.coords.latitude, pos.coords.longitude]);
          setInfoNotifOpen(true);

          newSocket.emit('join-room', { 
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            position: positionRef.current,
            roomId: params.id
          });
        }, error => console.log(error), { enableHighAccuracy: true });
      } else {
        alert('This feature is not supported on your device');
      }

      //watch and update self position
      //emit locationUpdate event if there are other users in map
      myPosition = navigator.geolocation.watchPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        positionRef.current = [pos.coords.latitude, pos.coords.longitude];
        if (currentViewEntRef.current === 'self') setCurrentView([pos.coords.latitude, pos.coords.longitude]);

        if (markersRef.current.length > 0) {
          newSocket.emit('locationUpdate', { 
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            position: positionRef.current,
            roomId: params.id
          });
        }
      }, error => console.log(error), { enableHighAccuracy: true });

      //receive join room event
      //add to markers if the user that joined doesn't exist in this map, else just update the position
      //join only if it's not another tab opened by the user
      //show 'another user joined' notification
      newSocket.on('join-room', newUser => {
        if (newUser.id !== user._id) {
          setMarkers(prevMarkers => {
            let hasMatch = false;
            prevMarkers.forEach(prevMarker => {
              if (prevMarker.id === newUser.id) {
                hasMatch = true;
              }
            });
            if (hasMatch) return prevMarkers;
            else {
              markersRef.current.push(newUser);
              return [...prevMarkers, newUser];
            }
          }); 
          
          setName(newUser.name);
          setSuccessNotifOpen(true);
          setDisconNotificationOpen(false);
        }
      })

      //receive update from other user's position
      //ignore if update from self on another tab
      newSocket.on('locationUpdate', update => {
        if (update.id !== user._id) {
          setMarkers(prevMarkers => {
            let hasMatch = false;
            prevMarkers.forEach(prevMarker => {
              if (prevMarker.id === update.id) {
                prevMarker.position = update.position;
                if (currentViewEntRef.current === 'other') setCurrentView(update.position);
                hasMatch = true;
              }
            });
            if (hasMatch) return prevMarkers;
            else {
              markersRef.current.push(update);
              return [...prevMarkers, update];
            }
          }); 
        }
      });

      //when another user disconnects
      //show disconnect notification only if not from self on another tab
      newSocket.on('userDisconnect', (data) => {
        if (data.id !== user._id) {
          setMarkers(prevMarkers => {
            prevMarkers.forEach((prevMarker, i) => {
              if (prevMarker.id === data.id) {
                prevMarkers.splice(i, 1);
                markersRef.current.splice(i, 1);
              }
            });
            return prevMarkers;
          });
          setSuccessNotifOpen(false);
          setDisconNotificationOpen(true);
          setName(data.name);
        }
      });
    }

    return () => navigator.geolocation.clearWatch(myPosition);
  }, [user]);

  const handleYourLocationClick = () => {
    currentViewEntRef.current = 'self';
    setShowCurrentView(true);
    setCurrentView([position[0], position[1]]);
  }

  const handleMeetingPlaceClick = () => {
    currentViewEntRef.current = 'meeting';
    setShowCurrentView(true);
    setCurrentView(negotiation.meetingPlace.latlng);
  }

  const handleOtherPersonLocationClick = () => {
    currentViewEntRef.current = 'other';
    setShowCurrentView(true);
    setCurrentView(markers[0].position);
  }


  return (
    <div className={classes.root} style={{height: `calc(${height}px - 64px)`}}>
      <MapContainer
        center={position}
        zoom={18}
        minZoom={14}
        maxZoom={18}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { showCurrentView && <MapView coords={currentView} /> }
        <MapDrag setShowCurrentView={setShowCurrentView} />
        <Marker position={position}>
          <Popup>
            You are here!
          </Popup>
        </Marker>
        {markers.map((marker, i) => (
          <Marker position={marker.position} key={i}>
            <Popup>
              {marker.name} is here!
            </Popup>
          </Marker>
        ))}
        {negotiation.meetingPlace && <Circle center={negotiation.meetingPlace.latlng} radius={20} pathOptions={{color:'#009688'}}>
          <Popup>
            {negotiation.meetingPlace.location}
          </Popup>
        </Circle>}
        
        <InfoNotification 
          infoNotifOpen={infoNotifOpen} 
          setInfoNotifOpen={setInfoNotifOpen}
        />
        <SuccessNotification 
          successNotifOpen={successNotifOpen} 
          setSuccessNotifOpen={setSuccessNotifOpen} 
          name={name}
          setName={setName}
        />
        <DisconnectNotification
          disconNotificationOpen={disconNotificationOpen} 
          setDisconNotificationOpen={setDisconNotificationOpen} 
          name={name}
          setName={setName}
        />   
        
      </MapContainer>
          
      <div className={`${classes.people} ${collapsePeople ? '' : classes.buttonsOpen}`}> 
        <Typography variant="h6" style={{color:'#fff', fontSize: '.9rem'}}>People in this map:</Typography>
        <ul style={{margin:0,paddingLeft:12, listStyle: 'none'}}>
          <li><Typography variant='body1' style={{color:'#fff', fontSize: '.95rem'}}>{user.firstName + ' ' + user.lastName}</Typography></li>
          <li><Typography variant='body1' style={{color:'#fff', fontSize: '.95rem'}}>{Object.keys(markers).length !== 0 ? markers[0].name : null}</Typography></li>
        </ul>
        <div className={classes.arrowIconPeople}>
          <IconButton size='small' onClick={handleCollapsePeople}>
            { collapsePeople ? <KeyboardArrowLeftIcon fontSize='large' style={{color:'#fff'}} /> : <KeyboardArrowRightIcon fontSize='large' style={{color:'#fff'}} />}
          </IconButton>
        </div>
      </div>
          
      <div className={`${classes.buttons} ${collapseButtons ? '' : classes.buttonsOpen}`}>
        <Button
          variant='outlined'
          color='primary'
          style={{color: 'white', marginBottom: 5}}
          onClick={handleYourLocationClick}
        >
          Your Location  
        </Button>
        <Button
          variant='outlined'
          color='primary'
          style={{color: 'white', marginBottom: 5}}
          onClick={handleMeetingPlaceClick}
          disabled={!negotiation.meetingPlace}
        >
          Meeting Place
        </Button>
        <Button
          variant='outlined'
          color='primary'
          style={{color: 'white'}}
          onClick={handleOtherPersonLocationClick}
          disabled={Object.keys(markers).length === 0}
        >
          {Object.keys(markers).length !== 0 ? `${markers[0].name.split(' ')[0]}'s location` : `Other user's location`}
        </Button>
        <div className={classes.arrowIcon}>
          <IconButton size='small' onClick={handleCollapseButtons}>
            { collapseButtons ? <KeyboardArrowLeftIcon fontSize='large' style={{color:'#fff'}} /> : <KeyboardArrowRightIcon fontSize='large' style={{color:'#fff'}} />}
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function MapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

function MapDrag({ setShowCurrentView }) {
  const timer = useRef(null);
  const map = useMapEvents({
    dragstart: () => {
      clearTimeout(timer.current);
      setShowCurrentView(false);
    },
    dragend: () => {
      timer.current = setTimeout(() => {
        setShowCurrentView(true);
      }, 20000);
    },
  })

  return null
}

function DisconnectNotification({ disconNotificationOpen, setDisconNotificationOpen, name, setName }) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setDisconNotificationOpen(false);
    //setName(null);
  };

  return (
    <Snackbar
      open={disconNotificationOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      style={{ marginTop: 120 }}
    >
      <Alert severity="error">
        {`${name} has disconnected`}
      </Alert>
    </Snackbar>
  )
}

function InfoNotification({ infoNotifOpen, setInfoNotifOpen }) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setInfoNotifOpen(false);
  };

  return (
    <Snackbar
      open={infoNotifOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      style={{ marginTop: 60 }}
    >
      <Alert severity="info">
        You have joined this map!
      </Alert>
    </Snackbar>
  )
}

function SuccessNotification({ successNotifOpen, setSuccessNotifOpen, name, setName, disconNotificationOpen  }) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessNotifOpen(false);
    //setName(null);
  };

  return (
    <Snackbar
      open={successNotifOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      style={{ marginTop: 120 }}
      
    >
      <Alert severity="success">
        {name} has joined this map!
      </Alert>
    </Snackbar>
  )
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default Map;