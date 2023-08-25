import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherApiService } from 'src/app/services/teacher-api.service';

@Component({
  selector: 'app-teacher-footer',
  templateUrl: './teacher-footer.component.html',
  styleUrls: ['./teacher-footer.component.css']
})
export class TeacherFooterComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: TeacherApiService, private route: ActivatedRoute) { }

  teacher: Teacher = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    accountType: '',
    password: '',
    confirmPassword: '',
    createdDate: '',
    articleIDs: '',
    newsIDs: ''
  }
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
    });

    this.getTeacher();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getTeacher() {
    this.service.getTeacher(this.routeid)
    .subscribe(
      response => {
        this.teacher = response;
      }
    );
  }

}
