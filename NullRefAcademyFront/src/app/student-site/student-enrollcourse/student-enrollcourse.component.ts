import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
import { StudentCourses } from 'src/app/models/studentcourses.model';
import { Teacher } from 'src/app/models/teacher.model';
import { StudentApiService } from 'src/app/services/student-api.service';

@Component({
  selector: 'app-student-enrollcourse',
  templateUrl: './student-enrollcourse.component.html',
  styleUrls: ['./student-enrollcourse.component.css']
})
export class StudentEnrollcourseComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  courseid!: number;
  constructor(private service: StudentApiService, private router: Router, private route: ActivatedRoute) { }

  student: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    accountType: '',
    password: '',
    confirmPassword: '',
    createdDate: '',
    bio: '',
    points: 0,
    progress: 0,
    timeSpent: '',
    coursesIDs: ''
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
  
  admins: Admin[] = [];
  teachers: Teacher[] = [];
  categories: Category[] = [];
  courses: Course[] = [];
  sections: Section[] = [];
  studentCourses: StudentCourses[] = [];
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.courseid = params['id2'];
      console.log('courseidd:' + this.courseid)
    });

    this.getStudent();
    this.getCourse();

    this.getAllAdmins();
    this.getAllTeachers();
    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();

    this.getStudentCourses();

    this.getStudent();
    this.onloadEnroll();

    this.sectionsNumbers();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getStudent() {
    this.service.getStudent(this.routeid)
      .subscribe(
        response => {
          this.student = response;
        }
      );
  }

  getCourse() {
    this.service.getCourse(this.courseid)
    .subscribe(
      response => {
        this.course = response;
      }
    );
  }

  getAllAdmins() {
    this.service.getAllAdmins()
    .subscribe(
      response => {
        this.admins = response;
      }
    );
  }

  getAllTeachers() {
    this.service.getAllTeachers()
    .subscribe(
      response => {
        this.teachers = response;
      }
    );
  }

  getAllCategories() {
    this.service.getAllCategories()
      .subscribe(
        response => {
          this.categories = response;
        }
      );
  }

  getAllCourses() {
    this.service.getAllCourses()
      .subscribe(
        response => {
          this.courses = response;
        }
      );
  }

  getAllSections() {
    this.service.getAllSections()
      .subscribe(
        response => {
          this.sections = response;
        }
      );
  }

  count: number = 0;
  counts: number[] = [];
  sectionsNumbers(){
    this.service.getAllSections()
      .subscribe(
        response => {
          this.sections.forEach(section => {
            if (section.courseID == this.courseid) {
              this.count++;
              this.counts[section.id] = this.count;
            }
          });
        }
      );
  }

  //Get courses of this student
  arrayCourses: string[] = [];
  innerArrayCourses: string[] = [];
  innerCourseId: number = 0;
  countttttt: number = 0;
  dates: string[] = [];
  br: number = 0;
  hasEnroll: boolean = false;
  isFind: boolean = false;
  getStudentCourses() {
    this.service.getStudent(this.routeid)
      .subscribe(
        response => {
          this.student = response;
          this.arrayCourses = this.student.coursesIDs.split(',');
          this.arrayCourses.forEach(coursee => {
            if (coursee != '') {
              this.innerArrayCourses = coursee.split('=');
              this.innerCourseId = Number(this.innerArrayCourses[0]);
              this.getAllCourses();
              for (let i = 0; i < this.courses.length; i++) {
                if (this.courses[i].id === this.innerCourseId) {
                  var element = {
                    id: this.courses[i].id,
                    title: this.courses[i].title,
                    description: this.courses[i].description,
                    points: this.courses[i].points,
                    createdDate: this.courses[i].createdDate,
                    categoryID: this.courses[i].categoryID,
                    teacherID: this.courses[i].teacherID,
                    adminID: this.courses[i].adminID,
                    studentsIDs: this.courses[i].studentsIDs,
                    isFinished: this.innerArrayCourses[1],
                    startDate: this.innerArrayCourses[2],
                    endDate: ''
                  }
                  if (this.innerArrayCourses.length == 4) {
                    element.endDate = this.innerArrayCourses[3];
                  }
                  this.studentCourses[this.countttttt++] = element;
                }
              }
            }
          });
          this.studentCourses.forEach(course => {
            if (course.id == this.courseid) {
              this.hasEnroll = true;
              this.isFind = true;
            }
          });
          if (!this.isFind) {
            var date = formatDate(Date.now(), 'dd/MM/YYYY', 'en-US').toString();
            this.student.coursesIDs += this.courseid + '=' + '0' + '=' + date + ',';
            if (this.br < 1) {
              this.course.studentsIDs += this.routeid + ',';
              this.onSubmitCourseStudent();
              this.br++;
            }
            this.onSubmitEnroll();
            this.getStudentCourses();
          }
        }
      );
  }

  //Finish course
  onSubmitCourses() {
    this.service.updateStudent(this.routeid, this.student)
    .subscribe(
      response => {
        this.router.navigate(['/Student/' + this.routeid + '/Dashboard']);
      }
    )
  }

  //Enroll course
  onSubmitEnroll() {
    this.service.updateStudent(this.routeid, this.student)
    .subscribe(
      response => {
        console.log(response);
      }
    )
  }

  //Course Student ids
  onSubmitCourseStudent() {
    this.service.updateCourse(this.courseid, this.course)
    .subscribe(
      response => {
        console.log(response);
      }
    )
  }

  points: number = 0;
  result: string = '';
  finishCourse(){
    this.studentCourses.forEach(course => {
      if (course.id == this.courseid) {
        course.isFinished = '1';
        this.points = course.points;
        var date = formatDate(Date.now(), 'dd/MM/YYYY', 'en-US').toString();
        course.endDate = date.toString();
        this.result +=  course.id + '=' + course.isFinished + '=' + course.startDate + '=' + course.endDate + ',';
      }
      else{
        if (course.endDate == '' || course.endDate == null) {
          this.result +=  course.id + '=' + course.isFinished + '=' + course.startDate + ',';
        }
        else{
          this.result +=  course.id + '=' + course.isFinished + '=' + course.startDate + '=' + course.endDate + ',';
        }
      }
    });
    this.student.coursesIDs = this.result;
    this.student.points += this.points;
    this.onSubmitCourses();
  }

  onloadEnroll(){
    this.service.getStudent(this.routeid)
      .subscribe(
        response => {
          this.student = response;
          if (this.student.coursesIDs == null) {
            var date = formatDate(Date.now(), 'dd/MM/YYYY', 'en-US').toString();
            this.student.coursesIDs = this.courseid + '=' + '0' + '=' + date + ',';
            this.course.studentsIDs += this.routeid + ',';
            this.onSubmitCourseStudent();
            this.onSubmitEnroll();
          }
        }
      );
  }

}
