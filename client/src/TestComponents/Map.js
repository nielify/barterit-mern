import { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
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
    bottom: 250,
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
    bottom: 80,
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
  zeroNotif: {
    margin: 50
  },
  oneNotif: {

  },
  twoNotif: {

  }
}));

const TestMap = () => {
  useRequireAuth()
  const classes = useStyles();
  const params = useParams();

  //logged in user
  const [user, setUser] = useContext(UserContext);

  //socket
  const [socket, setSocket] = useState(null);

  //positions
  const positionRef = useRef([0, 0]);
  const [position, setPosition] = useState([0, 0]);
  const [currentView, setCurrentView] = useState([0,0]);
  const [markers, setMarkers] = useState([]);
  const markersRef = useRef([]);

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

      //get self initial position
      //notificate self
      //emit join-room event
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

      //watch and update self position
      //emit locationUpdate event if there are other users in map
      myPosition = navigator.geolocation.watchPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        positionRef.current = [pos.coords.latitude, pos.coords.longitude];

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
        else {
          alert('self update');
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
          setDisconNotificationOpen(true);
          setName(data.name);
        }
      });
    }

    return () => navigator.geolocation.clearWatch(myPosition);
  }, [user]);

  const handleYourLocationClick = () => {
    setCurrentView([position[0], position[1]]);
  }

  const handleMeetingPlaceClick = () => {
    setCurrentView([13.9966, 121.9180]);
  }

  const handleOtherPersonLocationClick = () => {
    setCurrentView(markers[0].position);
  }


  return (
    <div className={classes.root}>
      <MapContainer
        center={position}
        zoom={18}
        minZoom={10}
        maxZoom={18}
        scrollWheelZoom={true}
      >
        <ChangeMapView coords={currentView} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
        <Circle center={[13.9966, 121.9180]} radius={50} pathOptions={{color:'#009688'}}>
          <Popup>
            The Meeting Place
          </Popup>
        </Circle>
        
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
          {Object.keys(markers).length !== 0 ? `${markers[0].name.split(' ')[0]}'s location'` : `Other user's location`}
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
      style={{ marginTop: 110 }}
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
      style={{ marginTop: 50 }}
    >
      <Alert severity="info">
        You have joined this map!
      </Alert>
    </Snackbar>
  )
}

function SuccessNotification({ successNotifOpen, setSuccessNotifOpen, name, setName, infoNotifOpen, disconNotificationOpen  }) {
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
      style={{ marginTop: 170 }}
      
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

export default TestMap;