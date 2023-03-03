import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { GridDataItem } from 'src/app/interfaces/grid-data-item';
import { DolarService } from 'src/app/services/dolar.service';

@Component({
  selector: 'exrate-blue',
  templateUrl: './dolar-blue.component.html',
  styleUrls: ['./dolar-blue.component.scss'],
})
export class DolarBlueComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  title = 'Find blue dollar value in a date range';
  form!: FormGroup;
  invalidDate: boolean = false;
  data!: Array<GridDataItem>;
  datePickerConfig: Partial<BsDatepickerConfig> = {
    showWeekNumbers: false,
    dateInputFormat: 'DD/MM/YYYY',
    maxDate: new Date(),
    daysDisabled: [0, 6],
  };

  constructor(private fb: FormBuilder, private dolarService: DolarService) {}

  ngOnInit(): void {
    this.createForm();

    this.form.valueChanges
      .pipe(
        debounceTime(5000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((val) => {
      this.invalidDate =
        val.beforeDate === '' ||
        val.afterDate === '' ||
        val.afterDate?.getTime() < val.beforeDate?.getTime();
    });
  }

  createForm() {
    this.form = this.fb.group({
      beforeDate: ['', Validators.required],
      afterDate: ['', Validators.required],
      salary: [0, Validators.required],
    });
  }

  onSubmit(): void {
    let beforeDateFormatted: string = this.formatDate(
      this.form.value.beforeDate
    );
    let afterDateFormatted: string = this.formatDate(this.form.value.afterDate);
    this.dolarService
      .getDollarValue(beforeDateFormatted, afterDateFormatted)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Array<string[]>) => {
        this.data = this.addSalaryCalculation(data);
      });
  }

  /**
   * formats  data from the server excluding the header titles and turning it into an array of objects
   * @param apiData the data got from the server
   * @returns tha data from the server as a single array of objects to pass it to Ag Grid
   */
  formatData(apiData: Array<string[]>): GridDataItem[] {
    let gridData: GridDataItem[] = [];
    for (let index = 1; index < apiData.length; index++) {
      let apiDataResult = apiData[index];
      let gridDataItems: GridDataItem = {};
      for (let j = 0; j < apiDataResult.length; j++) {
        const apiDataItem: string = apiDataResult[j];
        gridDataItems[apiData[0][j]] = apiDataItem;
      }
      gridData.push(gridDataItems);
    }
    return gridData;
  }
  /**
   *
   * @param apiData the data from the server
   * @returns a new array of gridDataItems with 'salary' property added
   */
  addSalaryCalculation(apiData: Array<string[]>): GridDataItem[] {
    let dataFormatted = this.formatData(apiData);
    dataFormatted.forEach((obj) => {
      let conversion = this.form.value.salary / parseFloat(obj['Venta']);
      obj['Sueldo'] = conversion.toFixed(2);
    });
    return dataFormatted;
  }

  /**
   *
   * @param date
   * @returns the date as a string with the format DD/MM/YYYY
   */
  formatDate(date: Date): string {
    let day: number = date.getDate();
    let month: number = date.getMonth() + 1;
    let year: number = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
