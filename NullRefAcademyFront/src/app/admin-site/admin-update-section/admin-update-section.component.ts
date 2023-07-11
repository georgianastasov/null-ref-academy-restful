import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-update-section',
  templateUrl: './admin-update-section.component.html',
  styleUrls: ['./admin-update-section.component.css']
})
export class AdminUpdateSectionComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  sectionid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  hasAdmin: boolean = false;
  hasTeacher: boolean = false;

  takenSection: Section = {
    id: 0,
    title: '',
    description: '',
    text: '',
    courseID: 0,
    teacherID: 0,
    adminID: 0
  }

  section: Section = {
    id: 0,
    title: '',
    description: '',
    text: '',
    courseID: 0,
    teacherID: 0,
    adminID: 0
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
      console.log('idAdmin: ' + params['id2']);
      this.sectionid = params['id2'];
    });

    this.getSection();
    this.getSectionAdmin();
    this.getSectionTeacher();
    this.getSectionCourse();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getSection() {
    this.service.getSection(this.sectionid)
    .subscribe(
      response => {
        console.log('Section');
        this.takenSection = response;
        this.getSectionCourse();
      }
    );
  }

  onSubmit() {
    this.populate();
    this.service.updateSection(this.sectionid, this.takenSection)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/Sections']);
      }
    )
  }

  populate(){
    if (this.section.title != '') {
      this.takenSection.title = this.section.title;
    }
    if (this.section.description != '') {
      this.takenSection.description = this.section.description;
    }
    if (this.section.text != '') {
      this.takenSection.text = this.section.text;
    }
  }

  //Get course of this section..
  courses: Course[] = [];
  courseText: string = '';
  inCourse: boolean = false;
  getSectionCourse(){
    this.service.getAllCourses()
    .subscribe(
      response => {
        this.courses = response;
        this.courses.forEach(course => {
          if (this.takenSection.courseID == course.id) {
            this.inCourse = true;
            this.courseText = "Id:" + course.id + " " + "Title:" + course.title;
          }
        });
        if (!this.inCourse) {
          this.courseText += "No information.";
        }
      }
    );
  }

  //Find creator - admin
  admins: Admin[] = [];
  adminText: string = '';
  getSectionAdmin(){
    this.service.getAllAdmins()
    .subscribe(
      response => {
        console.log('Admins');
        this.admins = response;
        this.admins.forEach(admin => {
          if (this.takenSection.adminID == admin.id) {
            this.hasAdmin = true;
            this.adminText += "Id:" + admin.id + " " + "Username:" + admin.username;
          }
        });
      }
    );
  }

  //Find creator - teacher
  teachers: Teacher[] = [];
  teacherText: string = '';
  getSectionTeacher(){
    this.service.getAllTeachers()
    .subscribe(
      response => {
        console.log('Teachers');
        this.teachers = response;
        this.teachers.forEach(teacher => {
          if (this.takenSection.teacherID == teacher.id) {
            this.hasTeacher = true;
            this.teacherText += "Id:" + teacher.id + " " + "Username:" + teacher.username;
          }
        });
      }
    );
  }

}
