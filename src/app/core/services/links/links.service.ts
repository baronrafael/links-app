import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Link } from 'src/app/shared/interfaces/link/link';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  linksUrl!: string;

  constructor(private httpClient: HttpClient) {
    this.linksUrl = 'links';
  }

  create(link: Link) {
    return this.httpClient.post(`${environment.apiUrl}${this.linksUrl}`, link);
  }

  list() {
    return this.httpClient.get<Link[]>(`${environment.apiUrl}${this.linksUrl}`);
  }

  delete(linkId: number) {
    return this.httpClient.delete(`${environment.apiUrl}${this.linksUrl}/${linkId}`);
  }

}
