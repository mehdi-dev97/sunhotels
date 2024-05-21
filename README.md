# Sunhotels module for nodejs

## Description

Simplifies interaction with the Sunhotels API, allowing developers to easily search for hotels, retrieve booking information, and manage bookings.

You will need to join for [sunhotels](https://www.sunhotels.com/en/join-us-form/) and set up your first application.

[Sunhotel Documentation](http://xml.sunhotels.net/15/SOAP/NonStaticXMLAPI.asmx/)

## Installation:

```npm install sunhotels```

## Quick Usage Example

```javascript

import { Client } from 'sunhotels';

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

client.get(params)
.then((resp) => {
        console.log(resp.count);
        console.log(resp.hotels);
}).catch((error) => console.error(error));

// FOR FULL USAGE, SEE BELOW..
```

## Initialization:

The client can be initialized directly.

```javascript

import { Client } from 'sunhotels';

// Initialize using username and password
const client = new Client("YOUR_API_USERNAME", "YOUR_API_PASSWORD");

```
## Get list of hotels offer:

If you want to search for the rooms/apartments/villas available in the system on a given date, use the get method. This method takes as argument a destructuring object which contains all the query strings to filter the results according to the needs of the client whether it is the date or number of rooms or number of adults etc...

```javascript

import { Client } from 'sunhotels';

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

client.get(params)
.then((resp) => {
        console.log(resp.count);
        console.log(resp.hotels);
}).catch((error) => console.error(error));

// Get a specific hotel using the id or you can pass in the destructuring params.
params.hotelIDs = "12382";

client.get(params)
.then((resp) => {
        console.log(resp.count);
        console.log(resp.hotels);
}).catch((error) => console.error(error));

```

*Required

**Required in specific situations

| Params               | Description                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------- |
| *destinationID       | The ID of the destination where the client wishes to look for rooms.                        |
| *checkInDate         | Date when the client wishes to check into the hotel.                                        |
| *checkOutDate        | date when the client wishes to check out of the hotel.                                      |
| *numberOfRooms       | The number of rooms that the client is interested in                                        |
| **hotelIDs           | The ID of the hotel where the client wishes to look for rooms.                              |
| *accommodationTypes  | The types of accommodation the client wants to search for (separated by commas).            |
| *numberOfAdults      | The number of adults the client wants the rooms to be able to accommodate.                  |
| *numberOfChildren    | The number of children the client wants the rooms to be able to accommodate.                |
| **childrenAges       | Ages of the children informed in numberOfChildren field. Allows values between 2 and 17     |

If you want more informations about API parameters, be sure to visit the [documentation](http://xml.sunhotels.net/15/XML%20spec%20Sunhotels%20v15.pdf).

