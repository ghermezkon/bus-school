import { Component, Input } from "@angular/core";

@Component({
    selector: 'rating',
    template: `
    <div class="rating">
        <input type="radio" disabled="true" id="star5" name="rating" value="5" /><label for="star5"></label>
        <input type="radio" disabled="true" id="star4" name="rating" value="4" /><label for="star4"></label>
        <input type="radio" disabled="true" id="star3" name="rating" value="3" /><label for="star3"></label>
        <input type="radio" disabled="true" id="star2" name="rating" value="2" /><label for="star2"></label>
        <input type="radio" disabled="true" id="star1" name="rating" value="1" /><label for="star1"></label>
    </div>   
    `,
    styles:[`
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
    `]
})
export class RatingComponent {
    @Input() value: number = 5;
    constructor() { }
}
