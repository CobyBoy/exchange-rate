import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DolarBlueComponent } from './dolar-blue.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DolarDataServiceMock } from 'src/app/mocks/data/dolar-data.service.mock';

describe('BlueComponent', () => {
  let component: DolarBlueComponent;
  let fixture: ComponentFixture<DolarBlueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DolarBlueComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DolarBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format date', () => {
    const date = new Date('Thu Sep 01 2022 22:05:30 GMT-0300 (Argentina Standard Time)');
    console.warn(date)
    const formattedDate = '1-9-2022';
    const formattedResult = component.formatDate(date);
    expect(formattedResult).toEqual(formattedDate);
  });

  it('should format data', () => {
    const apiData = DolarDataServiceMock;
    const gridData = [
      { Fecha: '01-09-2022', Compra: '280,00', Venta: '285,00' },
    ];
    
    const expected = component.formatData(apiData);
    expect(expected).toEqual(gridData);

  });
});
