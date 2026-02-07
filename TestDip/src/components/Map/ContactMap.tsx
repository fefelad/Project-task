import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { ADDRESS_COORDINATES } from './modal/data';
import styles from './ContactMap.module.css';


const createCustomIcon = () => divIcon({
    html: `
        <div style="
            background: #000;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
            border: 3px solid white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        ">
            📍
        </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 42],
    popupAnchor: [0, -40],
    className: 'custom-marker-icon'
});

function ChangeMapView({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap();
    
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    
    return null;
}

interface ContactMapProps {
    address: string;
    zoom?: number;
}

export default function ContactMap({ address, zoom = 16 }: ContactMapProps) {
    const coordinates = ADDRESS_COORDINATES[address as keyof typeof ADDRESS_COORDINATES] || 
                       ADDRESS_COORDINATES['Санкт‑Петербург — Невский проспект, 96'];

    const customIcon = createCustomIcon();

    return (
        <div className={styles.mapContainer}>
            <MapContainer
                enter={coordinates}
                zoom={zoom}
                className={styles.map}
                scrollWheelZoom={true}
                zoomControl={true}
                attributionControl={false}
                closePopupOnClick={true}
                dragging={true}
                trackResize={true}
                boxZoom={true}
                keyboard={true}
            >
                <ChangeMapView center={coordinates} zoom={zoom} />
                
                <TileLayer
                    url="https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1"
                />
                
                <Marker position={coordinates} icon={customIcon}>
                    <Popup>
                        <div className={styles.popupContent}>
                            <h3 className={styles.popupTitle}>Школа дизайна</h3>
                            <p className={styles.popupAddress}>{address}</p>
                            <div className={styles.popupDetails}>
                                <p>🕒 Пн-Пт: 9:00-21:00</p>
                                <p>📞 +7 (999) 123-45-67</p>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}