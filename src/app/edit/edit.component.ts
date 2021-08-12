import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  contact: any;
  id: string;
  userRef: any;

  contactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });

    this.dataService.getUserDoc(this.id).subscribe((res) => {
      this.contact = res;
      this.contactForm = this.formBuilder.group({
        firstName: [this.contact.firstName, Validators.required],
        lastName: [this.contact.lastName, Validators.required],
        designation: [this.contact.designation, Validators.required],
        email: [this.contact.email, [Validators.required, Validators.email]],
        longitude: [this.contact.longitude, Validators.required],
        latitude: [this.contact.latitude, Validators.required],
        phoneNumbers: this.formBuilder.array(this.contact.phoneNumbers),
      });
    });
  }

  get alternatePhoneNumbers() {
    return this.contactForm.get('phoneNumbers') as FormArray;
  }

  addAlternatePhoneNumber() {
    this.alternatePhoneNumbers.push(this.formBuilder.control(''));
  }

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.dataService.edit(this.contactForm.value, id);
    this.router.navigate(['']);
  }

  ngOnInit(): void {}
}
