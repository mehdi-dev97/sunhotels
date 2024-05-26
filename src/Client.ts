import { Helper } from "./Helpers";
import { Order } from "./Order";
import { Parameters } from "./types";
import { XMLParser } from "fast-xml-parser";

/**
 * Client for interaction with api
 *
 * @author Mehdi Ait Mouh
 * @public
 */
export class Client {
  /**
   * @type {string}
   */
  protected userName: string;

  /**
   * @type {string}
   */
  protected password: string;

  /**
   * @type {Helper}
   */
  public helper;

  /**
   * @type {Order}
   */
  public order;

  /**
   * @param {string} userName Username given from api service provider.
   * @param {string} password Password given from api service provider.
   */
  constructor(userName: string, password: string) {
    this.userName = userName;
    this.password = password;
    this.helper = new Helper(userName, password);
    this.order = new Order(userName, password);
  }

  /**
   * Get all hotels offer result from api.
   *
   * @param {Parameters} params search query.
   *
   * @returns {Promise<{count: any, hotels: any}>} Promise contain count result and list of hotels
   */
  public get({}: Parameters): Promise<{
    count: number;
    hotels: any;
  }> {
    const params = new URLSearchParams(arguments[0]);

    params.set("userName", this.userName);
    params.set("password", this.password);

    if (
      params.get("hotelIDs") !== null &&
      params.get("hotelIDs") !== undefined
    ) {
      params.set("destinationID", "");
    }
    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/SearchV2?${params.toString()}`
    )
      .then((response) => {
        return response.text();
      })
      .then((xml) => {
        return new XMLParser().parse(xml);
      })
      .then((data) => {
        if (data.hasOwnProperty("SearchResponse")) {
          throw new Error(data.SearchResponse.ReturnStatus.Exception);
        }
        let hotels = data.hasOwnProperty("searchresult")
          ? data.searchresult.hotels != ""
            ? data.searchresult.hotels.hotel
            : []
          : [];
        hotels = hotels instanceof Array ? hotels : [hotels];
        return {
          count: hotels.length,
          hotels: hotels,
        };
      })
      .catch((reason) => {
        throw new Error(reason);
      })
      .finally(() => {
        return { count: 0, hotels: 0 };
      });
  }
}
