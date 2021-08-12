import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  longitude: number = 30393.2;
  latitude: number = 399309.3;
  contactForm: FormGroup;
  submitted: false;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataServiceService,
    private router: Router
  ) {
    this.findMyLocation('longitude');
    this.findMyLocation('latitude');
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      designation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      longitude: [this.longitude, Validators.required],
      latitude: [this.latitude, Validators.required],
      phoneNumbers: this.formBuilder.array([]),
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  get alternatePhoneNumbers() {
    return this.contactForm.get('phoneNumbers') as FormArray;
  }

  addAlternatePhoneNumber() {
    this.alternatePhoneNumbers.push(this.formBuilder.control(''));
  }

  findMyLocation(cortinate) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (cortinate === 'longitude') {
          this.longitude = position.coords.longitude;
        } else {
          this.latitude = position.coords.latitude;
        }
      });
    }
  }

  onSubmit() {
    this.dataService.addData(this.contactForm.value);
    this.router.navigate(['']);
  }

  onDiscard() {
    this.submitted = false;
    this.contactForm.reset();
    this.alternatePhoneNumbers.reset();
  }
}
