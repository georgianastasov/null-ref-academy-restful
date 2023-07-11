import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { User } from 'src/app/models/user.model';
import { AdminApiService } from 'src/app/services/admin-api.service';


@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: AdminApiService, private route: ActivatedRoute, private router: Router) { 
  }

  users: any = [];
  admins: any = [];
  teachers: any = [];
  students: any = [];
  categories: any = [];
  courses: any = [];
  sections: any = [];

  userid: number = 0;

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllAdmins();
    this.getAllTeachers();
    this.getAllStudents();
    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
    });

    this.getCoursesOfStudent();
    this.getStudentsOfCourses();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getAllUsers() {
    this.service.getAllUsers()
    .subscribe(
      response => {
        console.log('Users');
        this.users = response;
        console.log(this.users);
      }
    );
  }

  getAllAdmins() {
    this.service.getAllAdmins()
    .subscribe(
      response => {
        console.log('Admins');
        this.admins = response;
        console.log(this.admins);
      }
    );
  }

  getAllTeachers() {
    this.service.getAllTeachers()
    .subscribe(
      response => {
        console.log('Teachers');
        this.teachers = response;
        console.log(this.teachers);
      }
    );
  }

  getAllStudents() {
    this.service.getAllStudents()
    .subscribe(
      response => {
        console.log('Students');
        this.students = response;
        console.log(this.students);
      }
    );
  }

  getAllCategories() {
    this.service.getAllCategories()
    .subscribe(
      response => {
        console.log('Categories');
        this.categories = response;
        console.log(this.categories);
      }
    );
  }

  getAllCourses() {
    this.service.getAllCourses()
    .subscribe(
      response => {
        console.log('Courses');
        this.courses = response;
        console.log(this.courses);
      }
    );
  }

  getAllSections() {
    this.service.getAllSections()
    .subscribe(
      response => {
        console.log('Sections');
        this.sections = response;
        console.log(this.sections);
      }
    );
  }

  getUserToDelete() {
    this.service.getUser(this.userid)
    .subscribe(
      response => {
        console.log('User');
        if (response.accountType == "Admin"){
          this.router.navigate(['/Admin/'+ this.routeid + '/Delete/Admin/' + response.id])
        }
        else if(response.accountType == "Teacher"){
          this.router.navigate(['/Admin/'+ this.routeid + '/Delete/Teacher/' + response.id])
        }
        else if(response.accountType == "Student"){
          this.router.navigate(['/Admin/'+ this.routeid + '/Delete/Student/' + response.id])
        }
      }
    );
  }

  findUserToDelete(id: number){
    this.userid = id;
    this.getUserToDelete();
  }

  getUserToUpdate(){
    this.service.getUser(this.userid)
    .subscribe(
      response => {
        console.log('User');
        if (response.accountType == "Admin"){
          this.router.navigate(['/Admin/'+ this.routeid + '/Update/Admin/' + response.id])
        }
        else if(response.accountType == "Teacher"){
          this.router.navigate(['/Admin/'+ this.routeid + '/Update/Teacher/' + response.id])
        }
        else if(response.accountType == "Student"){
          this.router.navigate(['/Admin/'+ this.routeid + '/Update/Student/' + response.id])
        }
      }
    );
  }

  findUserToUpdate(id: number){
    this.userid = id;
    this.getUserToUpdate();
  }

  //Get courses of this student.. 
  coursesText: string = '';
  courses2: Course[] = [];
  students2: Student[] = [];
  inCourses: boolean = false;
  array: string[] = [];
  courseArray: string[] = [];
  courseid: number = 0;
  courseTextArray: string[] = [];

  getCoursesOfStudent() {
    this.service.getAllCourses()
      .subscribe(
        response => {
          console.log('CoursesA');
          this.courses2 = response;
          this.service.getAllStudents()
            .subscribe(
              response => {
                console.log('StudentsA');
                this.students2 = response;
                this.students2.forEach(student => {
                  if (student.coursesIDs != null) {
                    this.array = student.coursesIDs.split(',');
                    this.removeNull(this.array);
                    for (let i = 0; i < this.array.length; i++) {
                      this.courseArray = this.array[i].split('=');
                      this.removeNull(this.courseArray);
                      this.courseid = parseInt(this.courseArray[0]);
                      this.courses2.forEach(course => {
                        if (this.courseid == course.id) {
                          this.inCourses = true;
                          this.coursesText += "Id: " + course.id + " " + "Title: " + course.title + ' <span class="line"></span> ';
                        }
                      });
                    }
                    this.courseTextArray[student.id] = this.coursesText;
                    this.coursesText = '';
                  }
                });
              }
            );
        }
      );
  }

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };

  //Get students of this course.. 
  studentText: string = '';
  courses3: Course[] = [];
  students3: Student[] = [];
  inStudents: boolean = false;
  array1: string[] = [];
  studentid: number = 0;
  studentTextArray: string[] = [];

  getStudentsOfCourses() {
    this.service.getAllStudents()
      .subscribe(
        response => {
          console.log('StudentsA');
          this.students3 = response;
          this.service.getAllCourses()
            .subscribe(
              response => {
                console.log('CoursesA');
                this.courses3 = response;
                this.courses3.forEach(course => {
                  if (course.studentsIDs != null) {
                    this.array1 = course.studentsIDs.split(',');
                    this.removeNull(this.array1);
                    for (let i = 0; i < this.array1.length; i++) {
                      this.studentid = parseInt(this.array1[i]);
                      this.students3.forEach(student => {
                        if (this.studentid == student.id) {
                          this.studentText += "Id:" + student.id + " " + "Username:" + student.username + ' <span class="line"></span> ';
                        }
                      });
                    }
                    this.studentTextArray[course.id] = this.studentText;
                    this.studentText = '';
                  }
                });
              }
            );
        }
      );
  }
}
