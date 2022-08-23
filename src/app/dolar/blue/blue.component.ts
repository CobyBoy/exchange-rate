import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { GridDataItem } from 'src/app/interfaces/grid-data-item';
import { DolarService } from 'src/app/services/dolar.service';

@Component({
  selector: 'exrate-blue',
  templateUrl: './blue.component.html',
  styleUrls: ['./blue.component.scss'],
})
export class BlueComponent implements OnInit {
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
    this.form = this.fb.group({
      beforeDate: ['', Validators.required],
      afterDate: ['', Validators.required],
    });

    this.form.valueChanges.subscribe((val) => {
      this.invalidDate =
        val.beforeDate === '' ||
        val.afterDate === '' ||
        val.afterDate?.getTime() < val.beforeDate?.getTime();
    });
  }

  onSubmit(): void {
    let beforeDateFormatted: string = this.formatDate(this.form.value.beforeDate);
    let afterDateFormatted: string = this.formatDate(this.form.value.afterDate);
    this.dolarService.getDollarValue(beforeDateFormatted, afterDateFormatted)
      .subscribe((data: Array<Array<string>>) => {
        this.data = this.formatData(data);
      });
  }

  /**
   * 
   * @param apiData the data got from the server
   * @returns tha data from the server as a single array of objects to pass it to Ag Grid
   */
  formatData(apiData: Array<Array<string>>): Array<GridDataItem> {
    let gridData: Array<GridDataItem> = [];
    for (let index = 1; index < apiData.length; index++) {
      let apiDataResult = apiData[index];
      let gridDataItems: GridDataItem = {};
      for (let index = 0; index < apiDataResult.length; index++) {
        const apiDataItem: string = apiDataResult[index];
        gridDataItems[apiData[0][index]] = apiDataItem;
      }
      gridData.push(gridDataItems);
    }
    return gridData;
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
}
