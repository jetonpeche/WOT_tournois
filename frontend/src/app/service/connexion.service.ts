import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouteAPIService } from './route-api.service';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  constructor(private http: HttpClient, private route: RouteAPIService) { }

  connexion(form): Observable<any>
  {
    return this.http.post<any>(`${this.route.PHP_API}/auth.php`, form);
  }
}
