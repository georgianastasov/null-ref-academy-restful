import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherApiService } from 'src/app/services/teacher-api.service';

@Component({
  selector: 'app-teacher-update-category',
  templateUrl: './teacher-update-category.component.html',
  styleUrls: ['./teacher-update-category.component.css']
})
export class TeacherUpdateCategoryComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  categoryid!: number;
  constructor(private service: TeacherApiService, private router: Router, private route: ActivatedRoute) { }

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

  hasAdmin: boolean = false;
  hasTeacher: boolean = false;

  categories: Category[] = [];
  courses: Course[] = [];
  sections: Section[] = [];

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.categoryid = params['id2'];
    });

    this.getTeacher();
    this.getCategory();
    this.getCategoryAdmin();
    this.getCategoryTeacher();
    this.getCoursesInThisCategory();

    this.getCountCategories();
    this.getCountCourses();
    this.getCountSections();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onSubmit() {
    this.populate();
    this.service.updateCategory(this.categoryid, this.takenCategory)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Teacher/' + this.routeid + '/Dashboard']);
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

  getTeacher() {
    this.service.getTeacher(this.routeid)
      .subscribe(
        response => {
          this.teacher = response;
        }
      );
  }

  getCategory() {
    this.service.getCategory(this.categoryid)
    .subscribe(
      response => {
        this.takenCategory = response;
      }
    );
  }

  //Get courses in this category..
  courses2: Course[] = [];
  coursesText: string = '';
  inCourses: boolean = false;
  getCoursesInThisCategory(){
    this.service.getAllCourses()
    .subscribe(
      response => {
        console.log('Courses');
        this.courses2 = response;
        this.courses2.forEach(course => {
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

  countCategories: number = 0;
  getCountCategories() {
    this.service.getAllCategories()
      .subscribe(
        response => {
          this.categories = response;
          this.categories.forEach(category => {
            if (category.teacherID != null) {
              if (category.teacherID == this.routeid) {
                this.countCategories++;
              }
            }
          });
        }
      );
  }

  countCourses: number = 0;
  getCountCourses() {
    this.service.getAllCourses()
      .subscribe(
        response => {
          this.courses = response;
          this.courses.forEach(course => {
            if (course.teacherID != null) {
              if (course.teacherID == this.routeid) {
                this.countCourses++;
              }
            }
          });
        }
      );
  }

  countSections: number = 0;
  getCountSections() {
    this.service.getAllSections()
      .subscribe(
        response => {
          this.sections = response;
          this.sections.forEach(section => {
            if (section.teacherID != null) {
              if (section.teacherID == this.routeid) {
                this.countSections++;
              }
            }
          });
        }
      );
  }

}
