import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-show-user',
  templateUrl: './admin-show-user.component.html',
  styleUrls: ['./admin-show-user.component.css']
})
export class AdminShowUserComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: AdminApiService, private route: ActivatedRoute, private router: Router) { }

  users: any = [];
  userid: number = 0;

  ngOnInit(): void {
    this.getAllUsers();

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.routeid = 0;
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
}
