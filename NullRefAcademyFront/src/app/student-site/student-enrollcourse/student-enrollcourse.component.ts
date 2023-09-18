import { DatePipe, formatDate } from '@angular/common';
import { Component, NgIterable, OnInit, ViewChild } from '@angular/core';
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
    coursesIDs: '',
    articleIDs: '',
    newsIDs: ''
  }

  course: Course = {
    id: 0,
    title: '',
    description: '',
    points: 0,
    rating: 0,
    ratingQty: 0,
    videoUrl: '',
    createdDate: '',
    categoryID: 0,
    teacherID: 0,
    adminID: 0,
    studentsIDs: '',
    usersStudentsRateIDs: '',
    usersTeachersRateIDs: ''
  }
  
  admins: Admin[] = [];
  teachers: Teacher[] = [];
  categories: Category[] = [];
  courses: Course[] = [];
  sections: Section[] = [];
  students: Student[] = [];
  studentCourses: StudentCourses[] = [];
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.courseid = params['id2'];
    });

    this.getStudent();
    this.getCourse();

    this.getAllAdmins();
    this.getAllTeachers();
    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();

    this.sectionsNumbers();
    this.checkFinish();
    this.checkRated();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getStudent() {
    this.service.getStudent(this.routeid)
      .subscribe(
        response => {
          this.student = response;
          console.log('response student')
          console.log(response)
        }
      );
  }

  getCourse() {
    this.service.getCourse(this.courseid)
    .subscribe(
      response => {
        this.course = response;
        console.log('response course')
        console.log(response)
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

  public count: number = 0;
  public counts: number[] = [];
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

  public finish = false;
  checkFinish() {
    this.service.getAllStudents()
      .subscribe(
        response => {
          this.students = response;
          this.students.forEach(student => {
            if(student.id === Number(this.routeid)){
                let coursesIDs = student.coursesIDs.split(',')
                coursesIDs.pop();
                for (let i = 0; i < coursesIDs.length; i++) {
                  let arr = coursesIDs[i].split('=');
                  let id = arr[0];
                  let isFinish = arr[1];
                  if(Number(id) == this.courseid){
                    if(isFinish === "0"){
                      this.finish = true;
                      break;
                    } else {
                      this.finish = false;
                    }
                  }
                }
            }
          });
        }
      );
  }

  private result: string = '';
  finishCourse(){
    this.service.getStudent(this.routeid)
    .subscribe(
      response => {
        this.student = response;
        let coursesIDs = this.student.coursesIDs.split(',')
        coursesIDs.pop();
        for (let i = 0; i < coursesIDs.length; i++) {
          let arr = coursesIDs[i].split('=');
          let id = arr[0];
          let date = arr[2];
          let finishDate = formatDate(Date.now(), 'dd/MM/YYYY', 'en-US').toString();
          if(Number(id) == this.courseid){
            this.result += id + '=' + "1" + '=' + date + '=' + finishDate;
            this.student.coursesIDs = this.student.coursesIDs.replace(coursesIDs[i], this.result)
            this.student.points += this.course.points;
            break;
          }
        }
        this.service.updateStudent(this.routeid, this.student)
        .subscribe(
          response => {
            setTimeout(() => {
              this.router.navigate(['/Student/' + this.routeid + '/Dashboard/']);
            }, 100);
        })
      },
    );
  }

  countStars(course: any){
    let arr = [];
    let number = course.rating / course.ratingQty;
    for (let i = 0; i < number; i++) {
      arr[i] = i;
    }
    return arr;
  }

  public rated = false;
  checkRated() {
    this.service.getAllStudents()
      .subscribe(
        response => {
          this.students = response;
          this.students.forEach(student => {
            if(student.id === Number(this.routeid)){
                if(this.course.usersStudentsRateIDs){
                  let usersRateIDs = this.course.usersStudentsRateIDs.split(',');
                  usersRateIDs.pop();
                  for (let i = 0; i < usersRateIDs.length; i++) {
                    let id = usersRateIDs[0];
                    if(Number(id) == student.id){
                      this.rated = true;
                      break;
                    } else {
                      this.rated = false;
                    }
                  }
                }
            }
          });
        }
      );
  }

  rateCourse(value: any){
    this.course.rating += Number(value);
    this.course.ratingQty += 1;
    this.course.usersStudentsRateIDs += this.routeid + ',';
    this.service.updateCourse(this.courseid, this.course)
        .subscribe(
          response => {
            setTimeout(() => {
              this.rated = true;
            }, 100);
        })
  }
}
