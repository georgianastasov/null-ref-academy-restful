import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Section } from 'src/app/models/section.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-add-section',
  templateUrl: './admin-add-section.component.html',
  styleUrls: ['./admin-add-section.component.css']
})
export class AdminAddSectionComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  nullfield!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  section: Section = {
    id: 0,
    title: '',
    description: '',
    text: '',
    courseID: 0,
    teacherID: this.nullfield,
    adminID: 0
  }

  courses: any = [];

  ngOnInit(): void {
    this.getAllCourses();

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onSubmit() {
    this.section.adminID = this.routeid;
    this.service.createSection(this.section)
    .subscribe(
      response => {
        console.log(response);
        console.log('Section:' + this.section);
        this.router.navigate(['/Admin/' + this.routeid + '/Sections']);
      }
    )
  }

  getAllCourses() {
    this.service.getAllCourses()
    .subscribe(
      response => {
        console.log('Courses');
        this.courses = response;
        console.log(this.courses);
      }
    );
  }
}
