import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DolarDataServiceMock } from '../mocks/data/dolar-data.service.mock';
import { DolarService } from './dolar.service';

describe('DolarService', () => {
  let service: DolarService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
      
      ],
    });
    service = TestBed.inject(DolarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable', () => {
    expect(service.getDollarValue('08-08-2022', '10-08-2022')).toBeInstanceOf(Observable);
  });

  it('should test the funcion', async () => {
    let beforeDateFormatted = '08-08-2022';
    let afterDateFormatted = '10-08-2022';
    service.getDollarValue(beforeDateFormatted, afterDateFormatted).subscribe({
      next: (data) => {
        expect(data).toEqual(DolarDataServiceMock);
      },
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBeNull();
      },
    });

    const req = httpMock.expectOne(`${environment.API_URL}${beforeDateFormatted}/${afterDateFormatted}`);
    console.warn(req.request.url)
    expect(req.request.method).toBe('GET');
    req.flush(DolarDataServiceMock);
  });


});
