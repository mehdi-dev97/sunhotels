import { XMLParser } from "fast-xml-parser";
import { PreBook, Book, BookingGetter } from "./types";

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
   * @param {PreBook} params pre book order.
   *
   */
  public preBook({}: PreBook): Promise<{
    status: boolean;
    preBookCode: any;
    price: number;
    notes: any;
    cancellationPolicies: any;
  }> {
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
        if (data.hasOwnProperty("SearchResponse")) {
          throw new Error(data.SearchResponse.ReturnStatus.Exception);
        }
        if (data.preBookResult.hasOwnProperty("Error")) {
          throw new Error(data.preBookResult.Error.Message);
        }
        return {
          status: true,
          preBookCode: data.preBookResult.PreBookCode,
          price: data.preBookResult.Price,
          notes: [data.preBookResult.Notes.Note] || [],
          cancellationPolicies:
            [data.preBookResult.CancellationPolicies.CancellationPolicy] || [],
        };
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  }

  /**
   * format data for booking request
   *
   * @param {string} str string to be formated
   *
   * @returns {string} formated string
   */
  protected format(str: string): string {
    const accentsMap: any = {
        à: "a",
        á: "a",
        â: "a",
        ä: "a",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        ò: "o",
        ó: "o",
        ô: "o",
        ö: "o",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "u",
        ç: "c",
        Ç: "C",
      },
      regex = /[àáâäèéêëìíîïòóôöùúûüçÇ]/gi;

    return str.replaceAll(regex, (match) => accentsMap[match]);
  }

  /**
   * booking hotel room
   *
   * @param {Book} params for book order.
   * @param {Object} guests data informations (first, last name, type, age: children).
   *
   * @returns {Promise<any>} Promise contain booking informations
   */
  public async book(
    {}: Book,
    guests: {
      type: string;
      firstName: string;
      lastName: string;
      age?: string;
    }[]
  ): Promise<any> {
    const params = new URLSearchParams(arguments[0]);

    params.set("userName", this.userName);
    params.set("password", this.password);

    let adultKey = 1,
      childKey = 1;

    for (const guest of guests) {
      if (guest.type == "adult") {
        params.set(
          `adultGuest${adultKey}FirstName`,
          this.format(guest.firstName)
        );
        params.set(
          `adultGuest${adultKey}LastName`,
          this.format(guest.lastName)
        );
        adultKey++;
      } else {
        params.set(
          `childrenGuest${childKey}FirstName`,
          this.format(guest.firstName)
        );
        params.set(
          `childrenGuest${childKey}LastName`,
          this.format(guest.lastName)
        );
        params.set(`childrenGuestAge${childKey}`, guest.age ?? "");
        childKey++;
      }
    }
    for (let i = 1; i <= 9; i++) {
      if (!params.has(`adultGuest${i}FirstName`)) {
        params.set(`adultGuest${i}FirstName`, "");
        params.set(`adultGuest${i}LastName`, "");
      }
      if (!params.has(`childrenGuest${i}FirstName`)) {
        params.set(`childrenGuest${i}FirstName`, "");
        params.set(`childrenGuest${i}LastName`, "");
        params.set(`childrenGuestAge${i}`, "");
      }
    }

    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/BookV2?${params.toString()}`
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
        if (data.bookResult.hasOwnProperty("Error")) {
          throw new Error(data.bookResult.Error.Message);
        }
        return data.bookResult.booking;
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  }

  /**
   * booking hotel room
   *
   * @param {BookingGetter} params for getting booking
   *
   * @returns {Promise<any>}
   */
  public async get({}: BookingGetter) {
    const params = new URLSearchParams(arguments[0]);

    params.set("userName", this.userName);
    params.set("password", this.password);

    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/GetBookingInformationV2?${params.toString()}`
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
        if (data.getBookingInformationResult.hasOwnProperty("Error")) {
          throw new Error(data.getBookingInformationResult.Error.Message);
        }
        return data.getBookingInformationResult.bookings.booking;
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  }

  /**
   * booking hotel room
   *
   * @param {string} bookingID
   * @param {string} language
   *
   * @returns {Promise<any>}
   */
  public async cancel(bookingID: string, language: string) {
    const params = new URLSearchParams({
      userName: this.userName,
      password: this.password,
      bookingID: bookingID,
      language: language,
    });

    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/CancelBooking?${params.toString()}`
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
        return data.result;
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  }
}
