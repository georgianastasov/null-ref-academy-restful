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
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit {

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

    this.getAllAdmins();
    this.getAllTeachers();
    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();

    this.getStudentCourses();

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
  hasEnroll:boolean = false;
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
            }
          });
        }
      );
  }

}
