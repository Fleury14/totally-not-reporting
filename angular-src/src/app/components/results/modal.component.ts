import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [ './results.component.scss' ]
})

export class ModalComponent implements OnInit {

  public ratings: number[];
  public rate;

  constructor(
    public openModal: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // console.log(this.data);
    this.ratings = Array(5); // [0,1,2,3,4]
    this.rate = (r) => (this.ratings = r);
  }

  onNoClick(): void {
    this.openModal.close();
  }

  public roundMillion(number: number) {
    const roundedMillion  = Math.round(number * 10 / 1000000) / 10;
    return '$' + roundedMillion.toString() + 'm';
  }

}
