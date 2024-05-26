import { describe, expect, test } from "@jest/globals";
import { Client } from "../src/Client";
import { Parameters } from "../src/types";

describe("Client module", () => {
  const client = new Client("API_USERNAME", "API_PASSWORD");
  const params: Parameters = {
    destinationID: 244,
    checkInDate: "2024-06-21",
    checkOutDate: "2024-06-22",
    numberOfAdults: 1,
    numberOfRooms: 1,
    numberOfChildren: 0,
    accommodationTypes: "Hotel",
    CustomerCountry: "FR",
    currencies: "USD",
    language: "EN",
  };
  // test getting all available hotels
  test("Get all hotels", async () => {
    const hotels = await client.get(params).then((resp) => {
      return resp;
    });

    expect(hotels).toEqual(
      expect.objectContaining({
        count: expect.any(Number),
        hotels: expect.any(Array),
      })
    );
    console.log(`${hotels.count} result found`);
  });
});
