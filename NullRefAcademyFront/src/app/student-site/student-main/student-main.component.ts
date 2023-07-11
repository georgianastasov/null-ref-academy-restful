import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
import { StudentCourses } from 'src/app/models/studentcourses.model';
import { StudentApiService } from 'src/app/services/student-api.service';

@Component({
  selector: 'app-student-main',
  templateUrl: './student-main.component.html',
  styleUrls: ['./student-main.component.css']
})
export class StudentMainComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: StudentApiService, private router: Router, private route: ActivatedRoute) { }

  bioStudent: Student = {
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

  editStudent: Student = {
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

  studentCourse: StudentCourses = {
    id: 0,
    title: '',
    description: '',
    points: 0,
    createdDate: '',
    categoryID: 0,
    teacherID: 0,
    adminID: 0,
    studentsIDs: '',
    isFinished: '',
    startDate: '',
    endDate: ''
  }

  students: Student[] = [];
  categories: Category[] = [];
  courses: Course[] = [];
  sections: Section[] = [];
  studentCourses: StudentCourses[] = [];

  startTime!: number;
  endTime!: number;
  totalTime!: string;
  totalTimeNumber!: number;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
    });
    this.getStudent();

    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();

    this.getStudentCourses();
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

  //Edit bio
  onSubmitBio() {
    this.bioPopulate();
    this.service.updateStudent(this.routeid, this.student)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/Student/' + this.routeid + '/Dashboard']);
          this.hideBioo();
        }
      )
  }

  bioPopulate() {
    if (this.bioStudent.bio != '') {
      this.student.bio = this.bioStudent.bio;
    }
  }

  //Edit profile
  onSubmitProfile() {
    this.editPopulate();
    this.service.updateStudent(this.routeid, this.student)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/Student/' + this.routeid + '/Dashboard']);
          this.hideEditt();
        }
      )
  }

  editPopulate() {
    if (this.editStudent.firstName != '') {
      this.student.firstName = this.editStudent.firstName;
    }
    if (this.editStudent.lastName != '') {
      this.student.lastName = this.editStudent.lastName;
    }
    if (this.editStudent.username != '') {
      this.student.username = this.editStudent.username;
    }
    if (this.editStudent.bio != '') {
      this.student.bio = this.editStudent.bio;
    }
  }

  //Get categories, courses, sections
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

  updateStudentProgress(result: number) {
    this.student.progress = result;
    this.service.updateStudent(this.routeid, this.student)
      .subscribe(
        response => {
          console.log('updated');
        }
      )
  }

  //Get courses of this student
  arrayCourses: string[] = [];
  innerArrayCourses: string[] = [];
  innerCourseId: number = 0;
  countttttt: number = 0;
  dates: string[] = [];
  br: number = 0;
  counter: number = 0;
  result: number = 0;
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
                  if (this.innerArrayCourses[1] == '0') {
                    this.dates[this.br] = this.innerArrayCourses[2];
                    this.br++;
                  }
                  else {
                    this.counter++;
                    this.dates[this.br] = this.innerArrayCourses[2];
                    this.br++;
                    this.dates[this.br] = this.innerArrayCourses[3];
                    this.br++;
                  }
                  this.dates.sort();
                  const [day, month, year] = this.dates[0].split('/');
                  const start = new Date(+year, +month - 1, +day);
                  const [dayy, monthh, yearr] = this.dates[this.dates.length - 1].split('/');
                  var end = new Date(+yearr, +monthh - 1, +dayy);
                  this.result = end.getTime() - start.getTime();
                  this.result = this.result / (1000 * 3600 * 24);
                }
              }
            }
          });
          this.updateStudentProgress(this.result);
        }
      );
  }

  //Show diferent menues
  showCourse: boolean = true;
  showProgres!: boolean;
  showProfile!: boolean;
  showCoursess() {
    this.showCourse = true;
    this.showProgres = false;
    this.showProfile = false;
  }

  showProgress() {
    this.showCourse = false;
    this.showProgres = true;
    this.showProfile = false;
  }

  showProfilee() {
    this.showCourse = false;
    this.showProgres = false;
    this.showProfile = true;
  }

  //Show and Hide bio
  showBio: boolean = false;

  showBioo() {
    this.hideEditt();
    this.showBio = true;
  }

  hideBioo() {
    this.showBio = false;
  }

  //Show and Hide edit
  showEdit: boolean = false;

  showEditt() {
    this.hideBioo();
    this.showEdit = true;
  }

  hideEditt() {
    this.showEdit = false;
  }
}
