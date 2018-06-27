import { Component, Input } from "@angular/core";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
    selector: 'rating',
    template: `
    <div [class.rating]="'true'" [class.padding]="!disabled">
        <input type="radio" #star5 (click)="onClick(5)" [disabled]="disabled" id="star5" name="rating" value="1" /><label for="star5"></label>
        <input type="radio" #star4 (click)="onClick(4)" [disabled]="disabled" id="star4" name="rating" value="2" /><label for="star4"></label>
        <input type="radio" #star3 (click)="onClick(3)" [disabled]="disabled" id="star3" name="rating" value="3" /><label for="star3"></label>
        <input type="radio" #star2 (click)="onClick(2)" [disabled]="disabled" id="star2" name="rating" value="4" /><label for="star2"></label>
        <input type="radio" #star1 (click)="onClick(1)" [disabled]="disabled" id="star1" name="rating" value="5" /><label for="star1"></label>        
    </div>   
    `,
    styles: [`
        .padding{
            display:flex !important;align-items:center !important;justify-content:center !important;
        }
        .rating:not(:checked) > input {
            position: absolute;
            top:-9999px;    
            clip:rect(0,0,0,0);
        }
        
        .rating:not(:checked) > label {
            float:left;
            width:0.8em;
            overflow:hidden;
            white-space:nowrap;
            font-size:2vh;  
            color:#ddd;
            text-shadow:2px 1px 3px rgba(0,0,0,0.3);
        }
        
        .rating:not(:checked) > label:before {
            content: '★ ';
        }    
        .rating > input:checked ~ label {
            color: #ea0;
        }
    `]
})
export class RatingComponent {
    @Input() value: number;
    @Input() disabled: any;
    @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('star1') star1: ElementRef;
    @ViewChild('star2') star2: ElementRef;
    @ViewChild('star3') star3: ElementRef;
    @ViewChild('star4') star4: ElementRef;
    @ViewChild('star5') star5: ElementRef;

    constructor() { }

    ngAfterViewInit() {
        if (this.value == 1) {
            this.star1.nativeElement.checked = true;
        } else if (this.value == 2) {
            this.star2.nativeElement.checked = true;
        } else if (this.value == 3) {
            this.star3.nativeElement.checked = true;
        } else if (this.value == 4) {
            this.star4.nativeElement.checked = true;
        } else if (this.value == 5) {
            this.star5.nativeElement.checked = true;
        }
    }
    onClick(rating: number): void {
        if (rating) {
            this.value = rating;
            this.ratingClick.emit(rating);
        }
    }
}
