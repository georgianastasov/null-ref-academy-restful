import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherApiService } from 'src/app/services/teacher-api.service';

@Component({
  selector: 'app-teacher-update-course',
  templateUrl: './teacher-update-course.component.html',
  styleUrls: ['./teacher-update-course.component.css']
})
export class TeacherUpdateCourseComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  courseid!: number;
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

  takenCourse: Course = {
    id: 0,
    title: '',
    description: '',
    points: 0,
    createdDate: '',
    categoryID: 0,
    teacherID: 0,
    adminID: 0,
    studentsIDs: ''
  }

  course: Course = {
    id: 0,
    title: '',
    description: '',
    points: 0,
    createdDate: '',
    categoryID: 0,
    teacherID: 0,
    adminID: 0,
    studentsIDs: ''
  }

  hasAdmin: boolean = false;
  hasTeacher: boolean = false;

  categories: Category[] = [];
  courses: Course[] = [];
  sections: Section[] = [];

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.courseid = params['id2'];
    });
    this.getTeacher();

    this.getCourse();
    this.getCourseCategory();
    this.getSectionsInThisCourse();
    this.getCourseAdmin();
    this.getCourseTeacher();
    this.getStudentsOfThisCourse();

    this.getCountCategories();
    this.getCountCourses();
    this.getCountSections();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onSubmit() {
    this.populate();
    this.service.updateCourse(this.courseid, this.takenCourse)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Teacher/' + this.routeid + '/Dashboard']);
      }
    )
  }

  populate(){
    if (this.course.title != '') {
      this.takenCourse.title = this.course.title;
    }
    if (this.course.description != '') {
      this.takenCourse.description = this.course.description;
    }
    if (this.course.points != 0) {
      this.takenCourse.points = this.course.points;
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

  getCourse() {
    this.service.getCourse(this.courseid)
    .subscribe(
      response => {
        this.takenCourse = response;
        this.getCourseCategory();
      }
    );
  }

  //Get students enrolled in this course..
  studentsText: string = '';
  students: Student[] = [];
  inStudent: boolean = false;
  array: string[] = [];
  studentArray: string[] = [];
  studentid: number = 0;

  getStudentsOfThisCourse(){
    this.service.getAllStudents()
    .subscribe(
      response => {
        console.log('Students');
        this.students = response;
        if (this.students != null) {
            this.array = this.takenCourse.studentsIDs.split(',');
            this.removeNull(this.array);
            for (let i = 0; i < this.array.length; i++) {
              this.students.forEach(student => {
                this.studentid = parseInt(this.array[i]);
                if (this.studentid == student.id) {
                  this.inStudent = true;
                  this.studentsText += "Id:" + student.id + " " + "Username:" + student.username + "\n";
                }
              });
            }
        }
        if(!this.inStudent){
          this.studentsText += "This course has no enrolled students.";
        }
      }
    );
  }

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };

  //Get category of this course..
  categories2: Category[] = [];
  categoryText: string = '';
  inCategory: boolean = false;
  getCourseCategory(){
    this.service.getAllCategories()
    .subscribe(
      response => {
        this.categories2 = response;
        this.categories2.forEach(category => {
          if (this.takenCourse.categoryID == category.id) {
            this.inCategory = true;
            this.categoryText = "Id:" + category.id + " " + "Title:" + category.title;
          }
        });
        if (!this.inCategory) {
          this.categoryText += "No information.";
        }
      }
    );
  }

  //Get sections in this course..
  sections2: Section[] = [];
  sectionsText: string = '';
  inSection: boolean = false;
  getSectionsInThisCourse(){
    this.service.getAllSections()
    .subscribe(
      response => {
        this.sections2 = response;
        this.sections2.forEach(section => {
          if (section.courseID == this.courseid) {
            this.inSection = true;
            this.sectionsText += "Id:" + section.id + " " + "Title:" + section.title + "\n";
          }
        });
        if (!this.inSection) {
          this.sectionsText += "No sections in this course.";
        }
      }
    );
  }

  //Find creator - admin
  admins: Admin[] = [];
  adminText: string = '';
  getCourseAdmin(){
    this.service.getAllAdmins()
    .subscribe(
      response => {
        console.log('Admins');
        this.admins = response;
        this.admins.forEach(admin => {
          if (this.takenCourse.adminID == admin.id) {
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
  getCourseTeacher(){
    this.service.getAllTeachers()
    .subscribe(
      response => {
        console.log('Teachers');
        this.teachers = response;
        this.teachers.forEach(teacher => {
          if (this.takenCourse.teacherID == teacher.id) {
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
