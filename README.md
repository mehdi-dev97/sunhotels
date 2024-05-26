# Sunhotels module for nodejs

## Description

Simplifies interaction with the Sunhotels API, allowing developers to easily search for hotels, retrieve booking information, and manage bookings.

You will need to join for [sunhotels](https://www.sunhotels.com/en/join-us-form/) and set up your first application.

[Sunhotel Documentation](http://xml.sunhotels.net/15/SOAP/NonStaticXMLAPI.asmx/)

## Installation:

`npm install sunhotel`

## Quick Usage Example

```javascript
import { Client } from "sunhotel";

const client = new Client("YOUR_API_USERNAME", "YOUR_API_PASSWORD"),
  params = {
    destinationID: 244,
    checkInDate: "2024-07-12",
    checkOutDate: "2024-07-13",
    numberOfAdults: 1,
    numberOfRooms: 1,
    numberOfChildren: 0,
    accommodationTypes: "Hotel",
    CustomerCountry: "FR",
    currencies: "USD",
    language: "EN",
  };

client
  .get(params)
  .then((resp) => {
    console.log(resp.count);
    console.log(resp.hotels);
  })
  .catch((error) => console.error(error));

// FOR FULL USAGE, SEE BELOW..
```

## Initialization:

The client can be initialized directly.

```javascript
import { Client } from "sunhotel";

// Initialize using username and password
const client = new Client("YOUR_API_USERNAME", "YOUR_API_PASSWORD");
```

## Get list of hotels offer:

If you want to search for the rooms/apartments/villas available in the system on a given date, use the get method. This method takes as argument a destructuring object which contains all the query strings to filter the results according to the needs of the client whether it is the date or number of rooms or number of adults etc...

```javascript
import { Client } from "sunhotel";

const params = {
  destinationID: 244, // you can get ids of all destination from helpers
  checkInDate: "2024-07-12",
  checkOutDate: "2024-07-13",
  numberOfAdults: 1,
  numberOfRooms: 1,
  numberOfChildren: 0,
  accommodationTypes: "Hotel",
  CustomerCountry: "FR",
  currencies: "USD",
  language: "EN",
};

client
  .get(params)
  .then((resp) => {
    console.log(resp.count);
    console.log(resp.hotels);
  })
  .catch((error) => console.error(error));

// Outputs
{
 count: 3,
 hotels: [{
  'hotel.id': 199899,
  destination_id: 244,
  resort_id: 534,
  transfer: 1,
  roomtypes: { roomtype: [ [Object], [Object] ] }}, ...
  ...]
}

// Get a specific hotel using the id or you can pass in the destructuring params.
params.hotelIDs = "12382";

client
  .get(params)
  .then((resp) => {
    console.log(resp.count);
    console.log(resp.hotels);
  })
  .catch((error) => console.error(error));
```

\*Required

\*\*Required in specific situations

| Params               | Description                                                                             |
| -------------------- | --------------------------------------------------------------------------------------- |
| \*destinationID      | The ID of the destination where the client wishes to look for rooms.                    |
| \*checkInDate        | Date when the client wishes to check into the hotel.                                    |
| \*checkOutDate       | date when the client wishes to check out of the hotel.                                  |
| \*numberOfRooms      | The number of rooms that the client is interested in                                    |
| \*\*hotelIDs         | The ID of the hotel where the client wishes to look for rooms.                          |
| \*accommodationTypes | The types of accommodation the client wants to search for (separated by commas).        |
| \*numberOfAdults     | The number of adults the client wants the rooms to be able to accommodate.              |
| \*numberOfChildren   | The number of children the client wants the rooms to be able to accommodate.            |
| \*\*childrenAges     | Ages of the children informed in numberOfChildren field. Allows values between 2 and 17 |

If you want more informations about API parameters, be sure to visit the [documentation](http://xml.sunhotels.net/15/XML%20spec%20Sunhotels%20v15.pdf).

## Helpers

You have many helpers at your disposal to make the components interact correctly with each other here is an example of the helpers that will be useful in building your system. These helpers are used for example in the filter of hotels by meals or by features.

```javascript

import { Client } from "sunhotel";

const client = new Client("YOUR_API_USERNAME", "YOUR_API_PASSWORD");

/**
* get available languagues in sunhotels system.
*
* @returns {Promise<{count: any, languagues: any}>} Promise contain count result and list of languagues
*/
client.helper.languagues();
// Outputs
{
 count: 4,
 languagues: [{ isoCode: "FR", name: "Français" }, ...]
}

/**
* get all available features based on language
*
* @param {string} lang languague translation
*
* @returns {Promise<{count: any, features: any}>} Promise contain count result and list of features
*/
client.helper.features("en");
// Outputs
{
 count: 3,
 features: [{ name: "Wifi" }, ...]
}

/**
* get all available meals based on language
*
* @param {string} lang languague translation
*
* @returns {Promise<{count: any, meals: any}>} Promise contain count result and list of meals
*/
client.helper.meals("fr");
// Outputs
{
 count: 3,
 meals: [{ name: "Demi-pension" }, ...]
}

/**
* get all available destination using in search hotel, you can use returned destination id in search hotel by city
*
* @param {string} lang languague translation
* @param {string | null} destinationCode search by destination iata code for example "PAR" (Paris) or "CMN" (Casablanca)
* @param {string | null} sortBy
* @param {string | null} sortOrder
* @param {string | null} exactDestinationMatch
*
* @returns {Promise<{count: any, destinations: any}>} Promise contain count result and list of destinations
*/
client.helper.destinations("en", "CMN");
// Outputs
{
 count: 3,
 destinations: [{ destination_id: 244, DestinationCode: "MA", DestinationName: "Marrakesh",... }, ...]
}

/**
* Get hotel information (name, location, description, images, room types...)
*
* @param {lang} lang
* @param {string} hotelIDs
*
* @returns {Promise<any>} Promise contain object of hotel information
*/
client.helper.hotel("en", "23238");
// Outputs
{
  type: 'Hotel',
  name: 131131,
  'hotel.addr.country': 'Morocco',
  'hotel.addr.countrycode': 'MA',
  'hotel.address': '131   Marrakech  Morocco',
  description: '...',
}

```

## Booking

### PreBook

This method is to be used as step 2 in the context of a 3 step booking process, after the search and before the booking request. The purpose of the PreBook call is to validate the information retrieved in search. This will allow you to alert the final customer of any changes prior to completing the booking.

```javascript
import { Client } from "sunhotel";

const client = new Client("YOUR_API_USERNAME", "YOUR_API_PASSWORD");

client.order.preBook({
  currency: "USD",
  language: "en",
  searchPrice: 38,
  checkInDate: "2024-06-01",
  checkOutDate: "2024-06-02",
  email: "mehdi.aitmouh.dev@gmail.com",
  rooms: 1,
  yourRef: "ZERF7832",
  roomId: "176936782",
  mealId: "3",
  adults: 1,
  children: 0,
  infant: 0,
  customerCountry: "FR",
  childrenAges: "",
  hotelId: "",
  roomtypeId: "",
  blockSuperDeal: "0",
  showPriceBreakdown: "",
  B2C: "",
}).then((resp) => {
    console.log(resp.status);
    console.log(resp.preBookCode);
    console.log(resp.notes);
    console.log(resp.cancellationPolicies);
}).catch((err) => console.error(err));
// Outputs
{
  status: true,
  preBookCode: '0613e4c3-0baf-4a2e-9a3a-e581b30d1ca6', // used in booking confirmation
  price: 38,
  notes: [...], // notice from hotel about the booking
  cancellationPolicies: [...] // deadline of cancellation
}

```

### Book

This function is used to book a room/apartment/villa. Take in account that you can only use latin alphabet characters in the guests names (adult and children), `yourRef`, `invoiceRef` and `specialrequest` tags.

```javascript
import { Client } from "sunhotel";

const client = new Client("YOUR_API_USERNAME", "YOUR_API_PASSWORD");

const params: Book = {
  currency: "USD",
  language: "en",
  checkInDate: "2024-06-01",
  checkOutDate: "2024-06-02",
  email: "mehdi.aitmouh.dev@gmail.com",
  rooms: "1",
  roomId: "176936782",
  mealId: "3",
  adults: "1",
  children: "0",
  infant: "0",
  customerCountry: "FR",
  b2c: "",
  specialrequest: "",
  yourRef: "DERF89",
  preBookCode: "84838394f-3324-439-a132-50592450997f",
  customerEmail: "mehdi.aitmouh.dev@gmail.com",
  paymentMethodId: "1",
  creditCardType: "",
  creditCardNumber: "",
  creditCardHolder: "",
  creditCardCVV2: "",
  creditCardExpYear: "",
  creditCardExpMonth: "",
  invoiceRef: "",
  commissionAmountInHotelCurrency: "",
};

const guests = [
  {
    type: "adult",
    firstName: "Mehdi",
    lastName: "Ait Mouh",
  },
];

client.order.book(params, guests).then((resp) => {
  console.log(resp.bookingnumber)
});
// outputs

{
  bookingnumber: '237287',
  'hotel.id': 38828382,
  'hotel.name': 'Hotel Inou Agadir',
  'hotel.address': 'Centre Aourir Km 12 Route Taghazout  80750  Agadir  Morocco',
  'hotel.phone': '+212 666 560 600',
  numberofrooms: 1,
  'room.type': 'Single room',
  'room.englishType': 'Single room',
  mealId: 3,
  meal: 'Breakfast',
  mealLabel: '',
  englishMeal: 'Breakfast',
  englishMealLabel: '',
  checkindate: '2024-06-01T00:00:00',
  checkoutdate: '2024-06-02T00:00:00',
  prices: [Object],
  currency: 'USD',
  bookingdate: '2024-05-25T15:29:06.633',
  'bookingdate.timezone': 'GMT+02:00:00',
  cancellationpolicies: [Object],
  'earliestNonFreeCancellationDate.CET': '2024-05-25T14:29:06.633',
  'earliestNonFreeCancellationDate.Local': '2024-05-25T15:29:06.633',
  yourref: 'DERF89',
  voucher: 'vocher link',
  bookedBy: 'Booking service provider',
  transferbooked: 0,
  paymentmethod: '',
  hotelNotes: [Object],
  englishHotelNotes: [Object],
  roomNotes: '',
  englishRoomNotes: '',
  invoiceref: ''
}

```

### Get booking

Get information about an existing booking or all bookings created within a specific date range or all bookings with an arrival date within a specific date range.

```javascript
import { Client } from "sunhotel";

const client = new Client("YOUR_API_USERNAME", "YOUR_API_PASSWORD");

const params = {
     language: "en",
     bookingID: "237287",
     reference: "",
     createdDateFrom: "",
     createdDateTo: "",
     arrivalDateFrom: "",
     arrivalDateTo: "",
     showGuests: 0
}
client.order.get(params).then((resp) => {
  console.log(resp.bookingnumber)
});

// Outputs
{
  bookingnumber: '237287',
  'hotel.id': 281280,
  'hotel.name': 'Hotel Inou Agadir',
  'hotel.address': 'Centre Aourir Km 12 Route Taghazout  80750  Agadir  Morocco',
  'hotel.phone': '+212 666 560 600',
  numberofrooms: 1,
  'room.type': 'Single room',
  'room.englishType': 'Single room',
  mealId: 3,
  meal: 'Breakfast',
  mealLabel: '',
  englishMeal: 'Breakfast',
  englishMealLabel: '',
  checkindate: '2024-06-01T00:00:00',
  checkoutdate: '2024-06-02T00:00:00',
  prices: { price: [ 38, 35 ] },
  currency: 'USD',
  bookingdate: '2024-05-25T15:29:06.633',
  'bookingdate.timezone': 'GMT+02:00:00',
  cancellationpolicies: {
    deadline: '',
    percentage: 100,
    text: 'Please note that this room is non-refundable and non-amendable. If the booking is cancelled, no money will be refunded.'
  },
  'earliestNonFreeCancellationDate.CET': '2024-05-25T14:29:06.633',
  'earliestNonFreeCancellationDate.Local': '2024-05-25T15:29:06.633',
  yourref: 'DERF89',
   voucher: 'vocher link',
  bookedBy: 'Booking service provider',
  transferbooked: 0,
  paymentmethod: '',
  hotelNotes: { hotelNote: [ [Object], [Object], [Object] ] },
  englishHotelNotes: { englishHotelNote: [ [Object], [Object], [Object] ] },
  roomNotes: '',
  englishRoomNotes: '',
  invoiceref: '',
  bookingStatus: 'Active',
  currentCancellationPolicyFee: { fee: [ 38, 35 ] },
  currentCancellationPolicyDeadline: '2024-06-03T00:00:00'
}

```

### Cancel booking

Cancel an existing booking. In case the booking also has a transfer booking attached, the transfer booking will also be cancelled.

```javascript
import { Client } from "sunhotel";

const client = new Client("YOUR_API_USERNAME", "YOUR_API_PASSWORD");

client.order.cancel("order_id", "lang").then((resp) => {
  /* 
    if 
      code === 1 booking has been cancelled successfulty 
      code === -2 has already been cancelled or probably cancellation have error
  */
  console.log(resp);
});
```

## Contributors :

Mehdi Ait Mouh <mehdi.aitmouh.dev@gmail.com> (software engineer)
