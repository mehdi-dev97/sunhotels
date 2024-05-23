import { XMLParser } from "fast-xml-parser";

/**
 * helper to get information from api like destination or themes languagues etc.
 *
 * @author Mehdi Ait Mouh
 * @public
 */
export class Helper {
  /**
   * @type {string}
   */
  protected userName: string;

  /**
   * @type {string}
   */
  protected password: string;

  /**
   * @type {URLSearchParams}
   */
  protected params: URLSearchParams;

  /**
   * @param {string} userName Username given from api service provider.
   * @param {string} password Password given from api service provider.
   */
  constructor(userName: string, password: string) {
    this.userName = userName;
    this.password = password;
    this.params = new URLSearchParams();
    this.params.set("userName", this.userName);
    this.params.set("password", this.password);
  }

  /**
   * Get all available languagues result from api.
   *
   * @returns {Promise<{count: any, languagues: any}>} Promise contain count result and list of languagues
   */
  public languagues(): Promise<{
    count: number;
    languagues: any;
  }> {
    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/GetLanguages?${this.params.toString()}`
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
        return {
          count: data.getLanguagesResult.languages.language.length,
          languagues: data.getLanguagesResult.languages.language,
        };
      })
      .catch((reason) => {
        throw new Error(reason);
      })
      .finally(() => {
        return { count: 0, languagues: 0 };
      });
  }

  /**
   * Get all available features.
   *
   * @param {string} lang languague translation of feature
   *
   * @returns {Promise<{count: any, features: any}>} Promise contain count result and list of features
   */
  public features(lang: string): Promise<{
    count: number;
    features: any;
  }> {
    this.params.set("language", lang);
    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/GetFeatures?${this.params.toString()}`
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
        return {
          count: data.getFeaturesResult.features.feature.length,
          features: data.getFeaturesResult.features.feature,
        };
      })
      .catch((reason) => {
        throw new Error(reason);
      })
      .finally(() => {
        return { count: 0, features: 0 };
      });
  }

  /**
   * Get all available meals.
   *
   * @param {string} lang languague translation of meals
   *
   * @returns {Promise<{count: any, meals: any}>} Promise contain count result and list of meals
   */
  public meals(lang: string): Promise<{
    count: number;
    meals: any;
  }> {
    this.params.set("language", lang);
    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/GetMeals?${this.params.toString()}`
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
        return {
          count: data.getMealsResult.meals.meal.length,
          meals: data.getMealsResult.meals.meal,
        };
      })
      .catch((reason) => {
        throw new Error(reason);
      })
      .finally(() => {
        return { count: 0, meals: 0 };
      });
  }

  /**
   * Get all possible search destinations.
   *
   * @param {string} lang languague translation
   * @param {string | null} destinationCode
   * @param {string | null} sortBy
   * @param {string | null} sortOrder
   * @param {string | null} exactDestinationMatch
   *
   * @returns {Promise<{count: any, destinations: any}>} Promise contain count result and list of destinations
   */
  public destinations(
    lang: string,
    destinationCode: string | null,
    sortBy: string | null,
    sortOrder: string | null,
    exactDestinationMatch: string | null
  ): Promise<{
    count: number;
    destinations: any;
  }> {
    this.params.set("language", lang);
    this.params.set("destinationCode", destinationCode ?? "");
    this.params.set("sortBy", sortBy ?? "");
    this.params.set("sortOrder", sortOrder ?? "");
    this.params.set("exactDestinationMatch", exactDestinationMatch ?? "");
    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/GetDestinations?${this.params.toString()}`
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
        return {
          count: data.DestinationList.Destinations.Destination.length,
          destinations: data.DestinationList.Destinations.Destination,
        };
      })
      .catch((reason) => {
        throw new Error(reason);
      })
      .finally(() => {
        return { count: 0, destinations: 0 };
      });
  }

  /**
   * Get all available themes result from api.
   *
   * @returns {Promise<{count: any, themes: any}>} Promise contain count result and list of themes
   */
  public themes(): Promise<{
    count: number;
    themes: any;
  }> {
    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/GetThemes?${this.params.toString()}`
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
        return {
          count: data.getThemesResult.themes.theme.length,
          themes: data.getThemesResult.themes.theme,
        };
      })
      .catch((reason) => {
        throw new Error(reason);
      })
      .finally(() => {
        return { count: 0, themes: 0 };
      });
  }
}
