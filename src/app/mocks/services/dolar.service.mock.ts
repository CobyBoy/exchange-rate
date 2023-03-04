import { of } from "rxjs";
import { DolarDataServiceMock } from "../data/dolar-data.service.mock";

export class DolarServiceMock {
  constructor() {}

  getDollarValue(beforeDateFormatted: string, afterDateFormatted: string) {
    return of<Array<Array<string>>>(DolarDataServiceMock);
  }
}