import { OrderParams } from "./types";
import { XMLParser } from "fast-xml-parser";

export class Order {
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
   * Pre booking hotel room
   *
   * @param {OrderParams} params pre book order.
   *
   * @returns {Promise<{status: boolean, preBookCode: string, message: string}>} Promise contain pre book status with message info
   */
  public preBook({}: OrderParams) {
    const params = new URLSearchParams(arguments[0]);

    params.set("userName", this.userName);
    params.set("password", this.password);
    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/PreBookV2?${params.toString()}`
    )
      .then((response) => {
        return response.text();
      })
      .then((xml) => {
        return new XMLParser().parse(xml);
      })
      .then((data) => {
        console.log(data);
        if (data.hasOwnProperty("SearchResponse")) {
          throw new Error(data.SearchResponse.ReturnStatus.Exception);
        }
        return {
          status: true,
          preBookCode: data,
          message: "",
        };
      })
      .catch((reason) => {
        throw new Error(reason);
      })
      .finally(() => {
        return { status: false, message: "Can not pre book" };
      });
  }
}
