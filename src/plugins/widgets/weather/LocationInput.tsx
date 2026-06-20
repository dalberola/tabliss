import React from "react";
import { useDebounce, useToggle } from "../../../hooks";
import { Icon } from "../../../views/shared";
import { searchLocations, requestLocation, LocationResult } from "./api";
import "./LocationInput.sass";
import { Coordinates } from "./types";

type Props = {
  latitude?: number;
  longitude?: number;
  onChange: (location: Coordinates & { name?: string }) => void;
};

const GeocodeInput: React.FC<Props> = ({ onChange }) => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<LocationResult[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([]);
      return;
    }
    searchLocations(debouncedQuery)
      .then(setResults)
      .catch(() => setResults([]));
  }, [debouncedQuery]);

  const formatLabel = (result: LocationResult) =>
    [result.name, result.admin1, result.countryCode]
      .filter(Boolean)
      .join(", ");

  const handleSelect = (result: LocationResult) => {
    setQuery(result.name);
    setResults([]);
    onChange({
      latitude: result.latitude,
      longitude: result.longitude,
      name: formatLabel(result),
    });
  };

  return (
    <div className="GeocodeInput">
      <label htmlFor="LocationInput__query">Search for city</label>
      <input
        id="LocationInput__query"
        placeholder="City or location"
        type="text"
        value={query}
        autoComplete="off"
        onChange={(event) => setQuery(event.target.value)}
        onBlur={() => setResults([])}
      />
      {results.length > 0 && (
        <ul
          className="GeocodeInput__results"
          onMouseDown={(e) => e.preventDefault()}
        >
          {results.map((result, i) => (
            <li key={i} onClick={() => handleSelect(result)}>
              {formatLabel(result)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const geolocationAvailable = "geolocation" in navigator;

const CoordinateInput: React.FC<Props> = ({
  latitude,
  longitude,
  onChange,
}) => {
  const handleLocate = () => {
    requestLocation()
      .then(onChange)
      .catch((err) => alert(`Cannot determine your location: ${err.message}`));
  };

  return (
    <div className="LocationInput">
      <div
        className="grid"
        style={{
          gridTemplateColumns: geolocationAvailable
            ? "1fr 1fr auto"
            : "1fr 1fr",
        }}
      >
        <label htmlFor="LocationInput__latitude">Latitude</label>

        <label htmlFor="LocationInput__longitude">Longitude</label>

        {geolocationAvailable && <div />}

        <input
          id="LocationInput__latitude"
          type="text"
          value={latitude}
          onChange={(event) =>
            onChange({ latitude: Number(event.target.value) })
          }
        />

        <input
          id="LocationInput__longitude"
          type="text"
          value={longitude}
          onChange={(event) =>
            onChange({ longitude: Number(event.target.value) })
          }
        />

        {geolocationAvailable && (
          <button
            className="button--primary button--icon"
            onClick={handleLocate}
          >
            <Icon name="navigation" />
          </button>
        )}
      </div>
    </div>
  );
};

const LocationInput: React.FC<Props> = ({ onChange, ...props }) => {
  const hasCoordinates = props.longitude && props.latitude;
  const [lookUp, toggleLookUp] = useToggle(!hasCoordinates);

  const handleChange = (coords: Coordinates) => {
    onChange(coords);
    if (lookUp) toggleLookUp();
  };

  return (
    <div className="LocationInput">
      {lookUp ? (
        <GeocodeInput {...props} onChange={handleChange} />
      ) : (
        <CoordinateInput {...props} onChange={handleChange} />
      )}

      <a onClick={toggleLookUp}>
        {lookUp ? "Enter coordinates" : "Search for city"}
      </a>
    </div>
  );
};

export default LocationInput;
