import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private loading: boolean = false;
  constructor() {}
  setLoading(Loading: boolean) {
    this.loading = Loading;
    console.log(this.loading, 'setloading');
  }
  getLoading(): boolean {
    console.log(this.loading, 'loading');
    return this.loading;
  }
}
