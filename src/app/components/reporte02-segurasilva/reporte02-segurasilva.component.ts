import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InvestmentByUser } from '../../models/investment-by-user';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-reporte02-segurasilva',
  templateUrl: './reporte02-segurasilva.component.html',
  styleUrl: './reporte02-segurasilva.component.scss'
})
export class Reporte02SegurasilvaComponent {
  dataSource = new MatTableDataSource<InvestmentByUser>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'username',
    'investment',
  ];

  constructor(private reportService: ReportService){}

  ngOnInit(): void {
    this.reportService.getInvestmentByUser().subscribe({
      next: (response) => {
        this.dataSource.data = response;
      }
    })
  }
}
