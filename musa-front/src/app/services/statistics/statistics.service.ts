import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrl = environment.apiUrl + '/statistics';

  constructor(private http: HttpClient) { }

  getStatistics(graphic: number, range: string): Observable<any> {
    console.log(graphic, range);
    return this.http.get<any>(`${this.apiUrl}/${graphic}/${range}`);
  }


}
