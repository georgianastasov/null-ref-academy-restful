import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-update-teacher',
  templateUrl: './admin-update-teacher.component.html',
  styleUrls: ['./admin-update-teacher.component.css']
})
export class AdminUpdateTeacherComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  teacherid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  takenTeacher: Teacher = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    accountType: '',
    password: '',
    confirmPassword: '',
    createdDate: ''
  }

  teacher: Teacher = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    accountType: '',
    password: '',
    confirmPassword: '',
    createdDate: ''
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
      console.log('idAdmin: ' + params['id2']);
      this.teacherid = params['id2'];
    });

    this.getTeacher();
    this.getCategoriesOfTeacher();
    this.getCoursesOfTeacher();
    this.getSectionsOfTeacher();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getTeacher() {
    this.service.getTeacher(this.teacherid)
    .subscribe(
      response => {
        console.log('Teacher');
        this.takenTeacher = response;
        console.log(this.takenTeacher);
      }
    );
  }

  onSubmit() {
    this.populate();
    this.service.updateTeacher(this.teacherid, this.takenTeacher)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/Teachers']);
      }
    )
  }

  populate(){
    if (this.teacher.firstName != '') {
      this.takenTeacher.firstName = this.teacher.firstName;
    }
    if (this.teacher.lastName != '') {
      this.takenTeacher.lastName = this.teacher.lastName;
    }
    if (this.teacher.username != '') {
      this.takenTeacher.username = this.teacher.username;
    }
    if (this.teacher.email != '') {
      this.takenTeacher.email = this.teacher.email;
    }
    if (this.teacher.password != '') {
      this.takenTeacher.password = this.teacher.password;
    }
    if (this.teacher.confirmPassword != '') {
      this.takenTeacher.confirmPassword = this.teacher.confirmPassword;
    }
  }

  //Get categories of this teacher.. 
  categoriesText: string = '';
  categories: Category[] = [];
  inCategorires: boolean = false;

  getCategoriesOfTeacher() {
    this.service.getAllCategories()
    .subscribe(
      response => {
        console.log('Categories');
        this.categories = response;
        this.categories.forEach(category => { 
          if(category.teacherID == this.teacherid){
            this.inCategorires = true;
            this.categoriesText += "Id:" + category.id + " " + "Title:" + category.title + "\n";
          }
        });
        if(!this.inCategorires){
          this.categoriesText += "This teacher has no categories.";
        }
      }
    );
  }

  //Get courses of this teacher.. 
  coursesText: string = '';
  courses: Course[] = [];
  inCourses: boolean = false;

  getCoursesOfTeacher() {
    this.service.getAllCourses()
    .subscribe(
      response => {
        console.log('Courses');
        this.courses = response;
        this.courses.forEach(course => {
          if(course.teacherID == this.teacherid){
            this.inCourses = true;
            this.coursesText += "Id:" + course.id + " " + "Title:" + course.title + "\n";
          }
        });
        if(!this.inCourses){
          this.coursesText += "This teacher has no courses.";
        }
      }
    );
  }

  //Get sections of this teacher.. 
  sectionsText: string = '';
  sections: Section[] = [];
  inSections: boolean = false;

  getSectionsOfTeacher() {
    this.service.getAllSections()
    .subscribe(
      response => {
        console.log('Sections');
        this.sections = response;
        this.sections.forEach(section => {
          if(section.teacherID == this.teacherid){
            this.inSections = true;
            this.sectionsText += "Id:" + section.id + " " + "Title:" + section.title + "\n";
          }
        });
        if(!this.inSections){
          this.sectionsText += "This teacher has no sections.";
        }
      }
    );
  }
}
