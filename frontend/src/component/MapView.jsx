import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";

const MapView = ({ path }) => {
    // dummy coordinates (based me DB se aayega)
    const coords = {
        A: [28.61, 77.23],
        B: [28.62, 77.25],
        C: [28.63, 77.20],
        D: [28.64, 77.28],
    };

    const positions = path.map((node) => coords[node]);
    return (
        <MapContainer center={[28.61, 77.23]} zoom={13} style={{ height: "300px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/*Markers*/}
            {positions.map((pos, index) => (
                <Marker key={index} position={pos} />
            ))}
            {/*Route Line*/}
            <Polyline positions={positions} color="blue" />



        </MapContainer>
    );
};
export default MapView;