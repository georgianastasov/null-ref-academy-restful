import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { StudentApiService } from 'src/app/services/student-api.service';

@Component({
  selector: 'app-student-settings',
  templateUrl: './student-settings.component.html',
  styleUrls: ['./student-settings.component.css']
})
export class StudentSettingsComponent implements OnInit {
  
  routeSub!: Subscription;
  routeid!: number;
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
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
    });
    
    this.getStudent();
    this.getCoursesOfStudent();
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

  onSubmit() {
    this.populate();
    this.service.updateStudent(this.routeid, this.student)
    .subscribe(
      response => {
        this.router.navigate(['/Student/' + this.routeid + '/Dashboard']);
      }
    )
  }

  populate(){
    if (this.editStudent.firstName != '') {
      this.student.firstName = this.editStudent.firstName;
    }
    if (this.editStudent.lastName != '') {
      this.student.lastName = this.editStudent.lastName;
    }
    if (this.editStudent.username != '') {
      this.student.username = this.editStudent.username;
    }
    if (this.editStudent.email != '') {
      this.student.email = this.editStudent.email;
    }
    if (this.editStudent.password != '') {
      this.student.password = this.editStudent.password;
    }
    if (this.editStudent.confirmPassword != '') {
      this.student.confirmPassword = this.editStudent.confirmPassword;
    }
    if (this.editStudent.bio != '') {
      this.student.bio = this.editStudent.bio;
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
          this.coursesText += "You no enrolled in any course.";
        }
      }
    );
  }

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };
}
