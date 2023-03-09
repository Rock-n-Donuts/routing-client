import React, { useState } from 'react';
import './App.css';
import { TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet'
import { LatLng, LeafletMouseEvent } from 'leaflet';
import useRoute from './useRoute';

const App = () => {
  const [route, setCoord] = useRoute();
  const [start, setStart] = useState<LatLng>({ lat: 45.4620335, lng: -73.5850831 } as LatLng);
  const [end, setend] = useState<LatLng>({ lat: 45.4620335, lng: -73.5850831 } as LatLng);
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      setend(e.latlng);
      setCoord({ start: start, end: e.latlng });
    },
    locationfound(e) {
      setStart(e.latlng);
      setCoord({ start: e.latlng, end: end });
    },
  });


  return (
    <div>,
      <TileLayer
        url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
      />
      <Marker position={[start.lat, start.lng]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Polyline positions={route} color="orange" weight={6} />
    </div>
  );
}

export default App;
