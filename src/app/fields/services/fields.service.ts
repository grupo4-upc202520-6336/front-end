import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { Fields } from "../models/fields.entity";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FieldsService extends BaseService<Fields>{

  constructor() {
    super();
    // CORREGIDO: ya no lleva /api aquí
    this.resourceEndpoint = '/api/v1/fields';
  }

  getFieldsByUserId(userId: number): Observable<Fields[]> {
    this.setToken();
    return this.http.get<Fields[]>(`${this.resourcePath()}/user/${userId}`, this.httpOptionsAuthorized);
  }

  createField(field: Fields): Observable<Fields> {
    this.setToken();
    return this.http.post<Fields>(`${this.resourcePath()}`, JSON.stringify(field), this.httpOptionsAuthorized);
  }

  updateField(id: number, field: Fields): Observable<Fields> {
    this.setToken();
    return this.http.put<Fields>(`${this.resourcePath()}/${id}/update-field`, JSON.stringify(field), this.httpOptionsAuthorized);
  }

  deleteField(id: number, producerId: number): Observable<any> {
    this.setToken();
    return this.http.delete(`${this.resourcePath()}/${id}?producerId=${producerId}`, this.httpOptionsAuthorized);
  }

}
