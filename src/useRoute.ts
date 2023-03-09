import axios from "axios";
import { LatLng, LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";

const useRoute = () => {
  const [coord, setCoord] = useState<{ start: LatLng, end: LatLng } | null>(
    null
  );
  const [route, setRoute] = useState<LatLngExpression[]>([]);

  useEffect(() => {
    if (coord && coord.start && coord.end) {
      (async () => {
        const response = await axios.post(`http://localhost:3001/route`, coord);
        setRoute(response.data);
      })();
    }
  }, [coord]);

  return [route, setCoord] as const;
};

export default useRoute;
