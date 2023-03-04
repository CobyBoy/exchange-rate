import { Component, Input, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { GridDataItem } from 'src/app/interfaces/grid-data-item';

@Component({
  selector: 'exrate-result-grid',
  templateUrl: './result-grid.component.html',
  styleUrls: ['./result-grid.component.scss'],
})
export class ResultGridComponent implements OnInit {
  private gridApi!: GridApi;
  @Input() gridData!: GridDataItem[];
  columnDefs: ColDef[] = [];
  defaultColDef: ColDef = {
    sortable: true,
    flex: 1,
  };

  constructor() {}

  ngOnInit(): void {}

  onGridReady(params: GridReadyEvent<any>): void {
    this.gridApi = params.api;
    this.gridApi.setDomLayout('autoHeight');
    this.gridApi.sizeColumnsToFit();
    this.setHeaders();
  }

  /**
   * Sets the headers for the grid, based on the keys of the first object recieved from the server
   */
  setHeaders(): void {
    this.columnDefs = [];
    let definitions: ColDef = {};
    let firstObject = this.gridData[0];
    for (const key in firstObject) {
      definitions = { headerName: key, field: key };
      this.columnDefs.push(definitions);
    }
    this.gridApi.setColumnDefs(this.columnDefs);
  }
}
