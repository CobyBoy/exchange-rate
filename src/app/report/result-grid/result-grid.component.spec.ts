import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgGridModule } from 'ag-grid-angular';
import { GridReadyEvent } from 'ag-grid-community';

import { ResultGridComponent } from './result-grid.component';

describe('ResultGridComponent', () => {
  let component: ResultGridComponent;
  let fixture: ComponentFixture<ResultGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgGridModule],
      declarations: [ResultGridComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expect grid to be ready', () => {
    component.ngOnInit();
  })

  it('', () => { 
    let arr3 = [
      {id:3, start: '0000', end:'0015', qty: 10},
      {id:3, start: '0015', end:'0030', qty: 20},
      {id:3, start: '0030', end:'0045', qty: 30},
    ]
    const {length } = arr3
  })

  // it('', () => { 
  //   let params: GridReadyEvent = {type: 'gridReady', api: {}, columnApi: {}};
  //   component.onGridReady(params);
  //   const sp = spyOn(component, 'setHeaders');
  //   expect(sp).toHaveBeenCalledTimes(1);
  // })
});
