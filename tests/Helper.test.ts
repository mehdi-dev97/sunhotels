import { describe, expect, test } from "@jest/globals";
import { Client } from "../src/Client";

describe("Helper module test", () => {
  const client = new Client("API_USERNAME", "API_PASSWORD");

  // // test getting all available Languagues
  test("test get all Languagues", async () => {
    const langs = await client.helper.languagues();

    expect(langs).toEqual(
      expect.objectContaining({
        count: expect.any(Number),
        items: expect.any(Array),
      })
    );
  });

  // test getting all available features
  test("test get all features", async () => {
    const features = await client.helper.features("en");

    expect(features).toEqual(
      expect.objectContaining({
        count: expect.any(Number),
        features: expect.any(Array),
      })
    );
  });

  // test getting all available meals
  test("test get all meals", async () => {
    const meals = await client.helper.meals("en");

    expect(meals).toEqual(
      expect.objectContaining({
        count: expect.any(Number),
        meals: expect.any(Array),
      })
    );
  });

  // test getting all available destinations
  test("test get all destinations", async () => {
    const destinations = await client.helper.destinations("en");

    expect(destinations).toEqual(
      expect.objectContaining({
        count: expect.any(Number),
        destinations: expect.any(Array),
      })
    );
  });

  // test getting all available destinations
  test("test get all themes", async () => {
    const themes = await client.helper.themes();

    expect(themes).toEqual(
      expect.objectContaining({
        count: expect.any(Number),
        themes: expect.any(Array),
      })
    );
  });

  // test getting all available destinations
  test("test get hotel informations", async () => {
    const hotel = await client.helper.hotel("en", "427666");

    expect(hotel).toBeInstanceOf(Object);
  });
});
