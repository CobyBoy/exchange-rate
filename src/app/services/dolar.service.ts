import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DolarService {
  constructor(private http: HttpClient) {}

  getDollarValue(beforeDateFormatted: string, afterDateFormatted: string) {
    return this.http.get<Array<Array<string>>>(
      `${environment.API_URL}${beforeDateFormatted}/${afterDateFormatted}`
    );
  }
}
