import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactMethods = [
    { id: 1, name: 'Email' },
    { id: 2, name: 'Phone' },
    { id: 3, name: 'Fax' },
    { id: 4, name: 'Stalking' }
  ]
  constructor() { }

  ngOnInit() {
  }

  submit(form:FormGroup){
    console.log(JSON.stringify(form.value, undefined, 2));
  }

}
