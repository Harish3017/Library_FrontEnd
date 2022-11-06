import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadingStatusSub = new Subject<boolean>();
  private statusSub = new Subject<boolean>();

  constructor() { }

  public setStatus(state: boolean): void {
    this.loadingStatusSub.next(state);
  }

  public getStatus(): Observable<boolean> {
    return this.loadingStatusSub.asObservable();
  }

  public setLoadingStatus(status: boolean): void {
    this.statusSub.next(status);
  }

  public getLoadingStatus(): Observable<boolean> {
    return this.statusSub.asObservable();
  }
}