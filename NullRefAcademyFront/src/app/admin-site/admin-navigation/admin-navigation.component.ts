import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent implements OnInit {
  public routeSub!: Subscription;
  public routeid!: number;

  constructor(private service: AdminApiService, private route: ActivatedRoute) { }

  admin: Admin = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    accountType: '',
    password: '',
    confirmPassword: '',
    createdDate: ''
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
    });

    this.getAdmin();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getAdmin() {
    this.service.getAdmin(this.routeid)
    .subscribe(
      response => {
        this.admin = response;
      }
    );
  }

}
