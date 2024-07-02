import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DevicesByUser } from '../models/devices-by-user';
import { environment } from '../../environments/environment';
import { InvestmentByUser } from '../models/investment-by-user';

@Injectable({
  providedIn: 'root',
})

export class ReportService {
  constructor(private httpClient: HttpClient) {}

  getCertificationByUser() {
    return this.httpClient.get<DevicesByUser[]>(
      `${environment.apiURL}/segura/devices/quantityByUser`
    );
  }

  getInvestmentByUser() {
    return this.httpClient.get<InvestmentByUser[]>(
      `${environment.apiURL}/segura/devices/investmentByUser`
    );
  }
}
