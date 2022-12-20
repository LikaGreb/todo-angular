import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private loading: boolean = false;
  constructor() {}
  setLoading(Loading: boolean) {
    this.loading = Loading;
  }
  getLoading(): boolean {
    return this.loading;
  }
}
