import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-update-category',
  templateUrl: './admin-update-category.component.html',
  styleUrls: ['./admin-update-category.component.css']
})
export class AdminUpdateCategoryComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  categoryid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  hasAdmin: boolean = false;
  hasTeacher: boolean = false;

  takenCategory: Category = {
    id: 0,
    title: '',
    description: '',
    teacherID: 0,
    adminID: 0
  }
  
  category: Category = {
    id: 0,
    title: '',
    description: '',
    teacherID: 0,
    adminID: 0
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
      console.log('idAdmin: ' + params['id2']);
      this.categoryid = params['id2'];
    });

    this.getCategory();
    this.getCategoryAdmin();
    this.getCategoryTeacher();
    this.getCoursesInThisCategory();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getCategory() {
    this.service.getCategory(this.categoryid)
    .subscribe(
      response => {
        console.log('Category');
        this.takenCategory = response;
        console.log(this.takenCategory);
      }
    );
  }

  onSubmit() {
    this.populate();
    this.service.updateCategory(this.categoryid, this.takenCategory)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/Categories']);
      }
    )
  }

  populate(){
    if (this.category.title != '') {
      this.takenCategory.title = this.category.title;
    }
    if (this.category.description != '') {
      this.takenCategory.description = this.category.description;
    }
  }

  //Get courses in this category..
  courses: Course[] = [];
  coursesText: string = '';
  inCourses: boolean = false;
  getCoursesInThisCategory(){
    this.service.getAllCourses()
    .subscribe(
      response => {
        console.log('Courses');
        this.courses = response;
        this.courses.forEach(course => {
          if (course.categoryID == this.categoryid) {
            this.inCourses = true;
            this.coursesText += "Id:" + course.id + " " + "Title:" + course.title + "\n";
          }
        });
        if (!this.inCourses) {
          this.coursesText += "No courses in this category.";
        }
      }
    );
  }

  //Find creator - admin
  admins: Admin[] = [];
  adminText: string = '';
  getCategoryAdmin(){
    this.service.getAllAdmins()
    .subscribe(
      response => {
        console.log('Admins');
        this.admins = response;
        this.admins.forEach(admin => {
          if (this.takenCategory.adminID == admin.id) {
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
  getCategoryTeacher(){
    this.service.getAllTeachers()
    .subscribe(
      response => {
        console.log('Teachers');
        this.teachers = response;
        this.teachers.forEach(teacher => {
          if (this.takenCategory.teacherID == teacher.id) {
            this.hasTeacher = true;
            this.teacherText += "Id:" + teacher.id + " " + "Username:" + teacher.username;
          }
        });
      }
    );
  }

}
