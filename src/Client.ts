import { Parameters } from "./types";
import { XMLParser } from "fast-xml-parser";

/**
 * This class represents a Person.
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
   * @param {string} userName Username given from api service provider.
   * @param {string} password Password given from api service provider.
   */
  constructor(userName: string, password: string) {
    this.userName = userName;
    this.password = password;
  }

  /**
   * Get all hotels offer result from api.
   *
   * @returns {Promise<{count: any, hotels: any}>} Promise contain count result and list of hotels
   */
  get({}: Parameters): Promise<{
    count: number;
    hotels: any;
  }> {
    const params = new URLSearchParams(arguments[0]);

    params.set("userName", this.userName);
    params.set("password", this.password);
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
        const hotels = data.hasOwnProperty('searchresult') ? data.searchresult.hotels.hotel : [];
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
