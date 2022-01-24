import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Link } from 'src/app/shared/interfaces/link/link';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  links = [
    {
      "id": "1",
      "createdAt": "2021-03-18T15:11:43.458Z",
      "url": "https://daphne.com",
      "name": "rodger.name"
    },
    {
      "id": "2",
      "createdAt": "2021-03-18T18:01:24.837Z",
      "url": "http://ferne.biz",
      "name": "german.name"
    }
  ];

  private links$ = new BehaviorSubject<Link[] | undefined>(this.links);

  getLinks(): Observable<Link[] | undefined> {
    return this.links$.asObservable();
  }
  
  setLinks(links: Link[] | undefined) {
    this.links$.next(links);
  }

  linksUrl!: string;

  constructor(private httpClient: HttpClient) {
    this.linksUrl = 'links';
  }

  create(link: Link) {
    return this.httpClient.post(`${environment.apiUrl}${this.linksUrl}`, link);
  }

  list() {
    return this.httpClient.get(`${environment.apiUrl}${this.linksUrl}`);
  }

  delete(linkId: string) {
    return this.httpClient.delete(`${environment.apiUrl}${this.linksUrl}/${linkId}`);
  }

}
