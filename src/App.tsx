import React from 'react';
import './App.css';
import { TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet'
import { LatLngExpression, LeafletMouseEvent } from 'leaflet';
import useRoute from './useRoute';

const App = () => {
  const [route, setCoord] = useRoute();
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      setCoord(e.latlng);
    }
  });


  return (
    <div>,
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[45.4620335, -73.5850831]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Polyline positions={route}/>
    </div>
  );
}

export default App;
