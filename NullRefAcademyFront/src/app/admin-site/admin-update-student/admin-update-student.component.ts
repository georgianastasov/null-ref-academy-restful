import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-update-student',
  templateUrl: './admin-update-student.component.html',
  styleUrls: ['./admin-update-student.component.css']
})
export class AdminUpdateStudentComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  studentid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  takenStudent: Student = {
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

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
      console.log('idAdmin: ' + params['id2']);
      this.studentid = params['id2'];
    });

    this.getStudent();
    this.getCoursesOfStudent();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getStudent() {
    this.service.getStudent(this.studentid)
    .subscribe(
      response => {
        console.log('Student');
        this.takenStudent = response;
        console.log(this.takenStudent);
      }
    );
  }

  onSubmit() {
    this.populate();
    this.service.updateStudent(this.studentid, this.takenStudent)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/Students']);
      }
    )
  }

  populate(){
    if (this.student.firstName != '') {
      this.takenStudent.firstName = this.student.firstName;
    }
    if (this.student.lastName != '') {
      this.takenStudent.lastName = this.student.lastName;
    }
    if (this.student.username != '') {
      this.takenStudent.username = this.student.username;
    }
    if (this.student.email != '') {
      this.takenStudent.email = this.student.email;
    }
    if (this.student.password != '') {
      this.takenStudent.password = this.student.password;
    }
    if (this.student.confirmPassword != '') {
      this.takenStudent.confirmPassword = this.student.confirmPassword;
    }
    if (this.student.points != 0) {
      this.takenStudent.points = this.student.points;
    }
    if (this.student.progress != 0) {
      this.takenStudent.progress = this.student.progress;
    }
    if (this.student.bio != '') {
      this.takenStudent.bio = this.student.bio;
    }
  }

  //Get courses of this student.. 
  coursesText: string = '';
  courses: Course[] = [];
  inCourses: boolean = false;
  array: string[] = [];
  courseArray: string[] = [];
  courseid: number = 0;
  
  getCoursesOfStudent() {
    this.service.getAllCourses()
    .subscribe(
      response => {
        console.log('Courses');
        this.courses = response;
        if (this.courses != null) {
            this.array = this.takenStudent.coursesIDs.split(',');
            this.removeNull(this.array);
            for (let i = 0; i < this.array.length; i++) {
              this.courseArray = this.array[i].split('=');
              this.removeNull(this.courseArray);
              this.courseid = parseInt(this.courseArray[0]);
              this.courses.forEach(course => {
                if (this.courseid == course.id) {
                  this.inCourses = true;
                  this.coursesText += "Id:" + course.id + " " + "Title:" + course.title + "\n";
                }
              });
            }
        }
        if(!this.inCourses){
          this.coursesText += "This student no enrolled in any course.";
        }
      }
    );
  }

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };
}
