const apiUrl = 'http://0.0.0.0:80/api';

export const getBikeDocksByCurrentLocation = (lat, lng) => `${apiUrl}/get-current-location/?lat=${lat}&lng=${lng}`;

export const carbonCoins = `${apiUrl}/checkout-run`;
