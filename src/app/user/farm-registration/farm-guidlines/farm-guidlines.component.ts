import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    BioSecurityGuidelines,
    IQuestionGroup,
} from '../data/biosecurity_guidelines';

@Component({
    selector: 'app-farm-guidlines',
    templateUrl: './farm-guidlines.component.html',
    styleUrls: ['./farm-guidlines.component.scss'],
})
export class FarmGuidlinesComponent implements OnInit {
    fg!: FormGroup;
    displayColumns: string[] = ['sno', 'question', 'answer']; //'sno' , 'question' , 'answer'
    questions: IQuestionGroup[] = BioSecurityGuidelines;
    constructor() {}

    ngOnInit(): void {
        console.log(this.questions);
    }
}
