import {NgForage} from 'ngforage';
import { Injectable } from '@angular/core';

@Injectable()
export class QuizLocalForage {
    constructor(private ngForage: NgForage) {}

    public setItem(key, value): Promise<any> {
        if (!key || !value) {
          return Promise.reject(null);
        }
        return this.ngForage.setItem(key, value).then(data => {
             return Promise.resolve(data);
        }, error => {
             return Promise.reject(error);
        });
    }

    public getItem(key): Promise<any> {
        if (!key) {
            return Promise.reject(null);
        }
        return this.ngForage.getItem(key).then(data => {
             return Promise.resolve(data);
        }, error => {
             return Promise.reject(error);
        });
    }

    public removeItem(key): Promise<any> {
        if (!key) {
          return Promise.reject(null);
        }
        return this.ngForage.removeItem(key).then(data => {
             return Promise.resolve(data);
        }, error => {
             return Promise.reject(error);
        });
    }

    public clear(): Promise<any> {
        return this.ngForage.clear().then(data => {
             return Promise.resolve(data);
        }, error => {
             return Promise.reject(error);
        });
    }
}
