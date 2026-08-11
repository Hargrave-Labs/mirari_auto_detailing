// Square Appointments booking site for Mirari Auto Detailing.
// Single source of truth — every "book" call to action on the site points here.
export const BOOKING_URL =
    'https://book.squareup.com/appointments/grm1qwkz4v668f/location/L5XEW5P5QKT8K';

// Square service IDs, keyed by the package title used in Sanity.
// ULTIMA is deliberately absent: it has three vehicle-size variants in Square
// (Small Car/Hatch, Large Sedan/SUV, Van/MPV/Ute), so the customer picks the
// right one on the booking site rather than us choosing for them.
const SQUARE_SERVICE_IDS = {
    ESSENTIA: 'XIG332YUDEMULRBPU5BOVPMX',
    CLARITAS: 'M7BEF2P63VHJGIPJQUZOIIXG',
};

// Deep link straight to a package on Square, falling back to the full booking
// site for anything we haven't mapped.
export const bookingUrlForService = (title) => {
    const id = SQUARE_SERVICE_IDS[title?.trim().toUpperCase()];
    return id ? `${BOOKING_URL}/services/${id}` : BOOKING_URL;
};
