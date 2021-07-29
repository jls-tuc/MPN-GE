import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SessionStoreService {
  private ls = window.sessionStorage;

  constructor() {}

  public setItem(key, value) {
    value = JSON.stringify(value);
    this.ls.setItem(key, value);
    return true;
  }

  public getItem(key) {
    const value = this.ls.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  public clear() {
    this.ls.clear();
  }
}
