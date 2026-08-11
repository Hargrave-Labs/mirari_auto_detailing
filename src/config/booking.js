// Square Appointments booking site for Mirari Auto Detailing.
// Every "book" call to action falls back to here.
export const BOOKING_URL =
    'https://book.squareup.com/appointments/grm1qwkz4v668f/location/L5XEW5P5QKT8K';

// Per-package deep links are content, not code: they come from the `bookingUrl`
// field on the Sanity service document. A package with no link set — Ultima, for
// instance, which has several vehicle-size options to choose between — sends the
// customer to the main booking page.
export const bookingUrlForService = (service) => service?.bookingUrl?.trim() || BOOKING_URL;
