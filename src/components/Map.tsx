import { MapContainer, Marker, Popup, TileLayer, Polygon, Polyline, Tooltip } from "react-leaflet";
import { LatLngTuple, icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Area, Coordinates, Trajectory, Truck } from "server/data";
import Control from "react-leaflet-custom-control";

function prepareCoords(coords: Coordinates[]): LatLngTuple[] {
    return coords.map((coord) => [coord.lat, coord.lon]);
}

const TruckIcon = icon({
    iconUrl: "/truck.png",
    iconSize: [64, 64]
});

function findSimpleCenter(coords: Coordinates[]): LatLngTuple {
    const lats = coords.map((m) => m.lat);
    const lons = coords.map((m) => m.lon);
    return [(Math.min(...lats) + Math.max(...lats)) / 2, (Math.min(...lons) + Math.max(...lons)) / 2];
}

const Map = ({
    areas,
    trajectories,
    truck,
    onPlayButtonClick = () => {
        return;
    }
}: {
    areas?: Area[];
    trajectories?: Trajectory[];
    truck?: Truck | null;
    onPlayButtonClick?: () => void;
}) => {
    const AreaPolygons =
        areas &&
        areas.length &&
        areas.map((area) => (
            <Polygon
                key={area.id}
                pathOptions={{
                    color: area.type === "load" ? "green" : "red"
                }}
                positions={prepareCoords(area.bounds)}
            >
                <Tooltip sticky>
                    #{area.id} <br /> {area.name} <br /> {area.type}
                </Tooltip>
            </Polygon>
        ));
    const TrajectoryPolylines =
        trajectories &&
        trajectories.length &&
        trajectories.map((trajectory) => (
            <Polyline key={trajectory.id} pathOptions={{ color: "blue" }} positions={prepareCoords(trajectory.points)}>
                <Tooltip sticky>
                    #{trajectory.id} <br /> {trajectory.name}
                </Tooltip>
            </Polyline>
        ));

    const TruckMarker = truck && truck.position_log && truck.position_log.length && (
        <Marker
            icon={TruckIcon}
            position={[
                truck.position_log[truck.position_log.length - 1].lat,
                truck.position_log[truck.position_log.length - 1].lon
            ]}
        >
            <Popup>
                #{truck.id} <br /> {truck.name}
            </Popup>
        </Marker>
    );
    const center: LatLngTuple =
        areas && areas.length
            ? findSimpleCenter(areas.map((a) => a.bounds).reduce((a, b) => a.concat(b), []))
            : [55.75222, 37.61556];
    return (
        <MapContainer center={center} zoom={20} scrollWheelZoom={true} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {AreaPolygons}
            {TrajectoryPolylines}
            {TruckMarker}
            <Control prepend position="topleft">
                <button
                    style={{
                        backgroundColor: "#4CAF50",
                        border: "none",
                        color: "white",
                        padding: "15px 32px",
                        textAlign: "center",
                        fontSize: "20px",
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        onPlayButtonClick();
                    }}
                >
                    Play
                </button>
            </Control>
        </MapContainer>
    );
};

export default Map;
