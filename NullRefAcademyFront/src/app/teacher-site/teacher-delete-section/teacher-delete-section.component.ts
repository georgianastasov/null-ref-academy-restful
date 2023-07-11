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
  selector: 'app-teacher-delete-section',
  templateUrl: './teacher-delete-section.component.html',
  styleUrls: ['./teacher-delete-section.component.css']
})
export class TeacherDeleteSectionComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  sectionid!: number;
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

  section: Section = {
    id: 0,
    title: '',
    description: '',
    text: '',
    courseID: 0,
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
      this.sectionid = params['id2'];
    });
    this.getTeacher();

    this.getSection();
    this.getSectionCourse();
    this.getSectionAdmin();
    this.getSectionTeacher();

    this.getCountCategories();
    this.getCountCourses();
    this.getCountSections();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onSubmit() {
    this.service.deleteSection(this.sectionid)
    .subscribe(
      response => {
        this.router.navigate(['/Teacher/' + this.routeid + '/Dashboard']);
      }
    )
  }

  getSection() {
    this.service.getSection(this.sectionid)
    .subscribe(
      response => {
        this.section = response;
        this.getSectionCourse();
      }
    );
  }

  getTeacher() {
    this.service.getTeacher(this.routeid)
      .subscribe(
        response => {
          this.teacher = response;
        }
      );
  }

  //Get course of this section..
  courses2: Course[] = [];
  courseText: string = '';
  inCourse: boolean = false;
  getSectionCourse(){
    this.service.getAllCourses()
    .subscribe(
      response => {
        this.courses2 = response;
        this.courses2.forEach(course => {
          if (this.section.courseID == course.id) {
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
          if (this.section.adminID == admin.id) {
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
          if (this.section.teacherID == teacher.id) {
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
