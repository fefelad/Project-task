// Тип для координат [широта, долгота]
type Coordinate = [number, number];

interface AddressCoordinates {
    [address: string]: Coordinate;
}

export const ADDRESS_COORDINATES: AddressCoordinates = {
    'Санкт‑Петербург — Невский проспект, 96': [59.932117, 30.354577] as [number, number],
    'Санкт‑Петербург — Лиговский проспект, 22': [59.9280, 30.3608] as [number, number],
    'Москва — ул. Тверская, 15': [55.7610, 37.6095] as [number, number],
    'Москва — ул. Покровка, 8': [55.7593, 37.6472] as [number, number],
};