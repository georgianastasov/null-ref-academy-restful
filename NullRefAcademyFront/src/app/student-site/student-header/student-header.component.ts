import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/models/student.model';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { StudentApiService } from 'src/app/services/student-api.service';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: StudentApiService, private route: ActivatedRoute) { }

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

  startTime!: number;
  endTime!: number;
  totalTime!: string;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
    });

    this.getStudent();
    this.time();
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

  time() {
    this.service.getStudent(this.routeid)
      .subscribe(
        response => {

          var array = this.student.timeSpent.split(':');
          var hoursArray = array[0].split('h');
          var hours = Number(hoursArray[0]);
          var minutesArray = array[1].split('m');
          var minutes = Number(minutesArray[0]);
          var secondsArray = array[2].split('s');
          var seconds = Number(secondsArray[0]);
          seconds += 30;
          if (seconds > 59) {
            minutes += 1;
            seconds -= 60;
            if (minutes > 59) {
              hours += 1;
              minutes -= 60;
            }
          }
          this.totalTime = hours + 'h:' + minutes + 'm:' + seconds + 's';
          this.student.timeSpent = this.totalTime;
          this.updatestudentTime();
        }
      );
  }

  updatestudentTime() {
    this.service.updateStudent(this.routeid, this.student)
      .subscribe(
        response => {
          console.log(response);
        }
      )
  }
}
