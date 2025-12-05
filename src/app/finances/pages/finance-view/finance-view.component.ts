import {Component, inject, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FinanceService} from "../../services/finance.service";
import {Finance} from "../../models/finance.entity";
import {FinanceTableComponent} from "../../components/finance-table/finance-table.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-finance-view',
  standalone: true,
  imports: [
    FinanceTableComponent,
    TranslateModule
  ],
  templateUrl: './finance-view.component.html',
  styleUrl: './finance-view.component.css'
})
export class FinanceViewComponent implements OnInit{
  protected dataSource!: MatTableDataSource<any>;
  private financeService: FinanceService = inject(FinanceService);
  private agriculturalProcessId!: number;

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getFinances();
  }

  getFinances(): void {
    // 1. Intentamos leer el ID del almacenamiento
    const storedId = localStorage.getItem('agriculturalProcessId');

    // 2. Verificamos SI existe Y SI es un número válido
    if (storedId && !isNaN(Number(storedId))) {
      this.agriculturalProcessId = Number(storedId);

      // Solo si tenemos un ID válido, llamamos al backend
      this.financeService.getFinancesByAgriculturalProcessId(this.agriculturalProcessId)
        .subscribe({
          next: (data: Array<Finance>) => {
            this.dataSource.data = data;
          },
          error: (err) => {
            console.error('Error al obtener finanzas:', err);
          }
        });
    } else {
      // 3. Si no hay ID, no hacemos la llamada y evitamos el error NaN
      console.warn('Aviso: No se encontró un agriculturalProcessId seleccionado en el localStorage.');
      // Opcional: Podrías limpiar la tabla aquí si fuera necesario
      this.dataSource.data = [];
    }
  }
}
