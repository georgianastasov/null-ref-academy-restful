import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-delete-student',
  templateUrl: './admin-delete-student.component.html',
  styleUrls: ['./admin-delete-student.component.css']
})
export class AdminDeleteStudentComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  studentid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

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
        this.student = response;
        console.log(this.student);
      }
    );
  }

  onSubmit() {
    this.service.deleteStudent(this.studentid)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/Students']);
      }
    )
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
              this.array = this.student.coursesIDs.split(',');
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


