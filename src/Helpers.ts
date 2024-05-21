import { Client } from "./Client";
import { Parameters } from "./types";
import { XMLParser } from "fast-xml-parser";

/**
 * helper to get information from api like destination or themes.
 *
 * @author Mehdi Ait Mouh
 * @public
 */
export class Helper extends Client {
    /**
    * @param {string} userName Username given from api service provider.
    * @param {string} password Password given from api service provider.
    */
    constructor(userName: string, password: string) {
        super(userName, password);
    }

    
}
