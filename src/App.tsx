import React, { useEffect, useState } from 'react';
import './App.css';
import { TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet'
import { LatLng, LeafletMouseEvent } from 'leaflet';
import useRoute from './useRoute';

const App = () => {
  const [route, setCoord] = useRoute();
  const [start, setStart] = useState<LatLng | null>(null);
  const [end, setend] = useState<LatLng | null>(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setStart({ lat: position.coords.latitude, lng: position.coords.longitude } as LatLng);
    })
  }, [])

  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      setend(e.latlng);
      if (start) {
        setCoord({ start: start, end: e.latlng });
      }
    },
    locationfound(e) {
      setStart(e.latlng);
      if (end) {
        setCoord({ start: e.latlng, end: end });
      }
    },
  });

  const marker = start ?
    <Marker position={[start.lat, start.lng]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
    : null;

  return (
    <div>,
      <TileLayer
        url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
      />
      {marker}
      <Polyline positions={route} color="orange" weight={6} />
    </div>
  );
}

export default App;
