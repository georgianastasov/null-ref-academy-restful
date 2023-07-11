import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-update-admin',
  templateUrl: './admin-update-admin.component.html',
  styleUrls: ['./admin-update-admin.component.css']
})
export class AdminUpdateAdminComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  adminid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  takenAdmin: Admin = {
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
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
      console.log('idAdmin: ' + params['id2']);
      this.adminid = params['id2'];
    });

    this.getAdmin();
    this.getCategoriesOfAdmin();
    this.getCoursesOfAdmin();
    this.getSectionsOfAdmin();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getAdmin() {
    this.service.getAdmin(this.adminid)
    .subscribe(
      response => {
        console.log('Admin');
        this.takenAdmin = response;
        console.log(this.takenAdmin);
      }
    );
  }

  onSubmit() {
    this.populate();
    this.service.updateAdmin(this.adminid, this.takenAdmin)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/Admins']);
      }
    )
  }

  populate(){
    if (this.admin.firstName != '') {
      this.takenAdmin.firstName = this.admin.firstName;
    }
    if (this.admin.lastName != '') {
      this.takenAdmin.lastName = this.admin.lastName;
    }
    if (this.admin.username != '') {
      this.takenAdmin.username = this.admin.username;
    }
    if (this.admin.email != '') {
      this.takenAdmin.email = this.admin.email;
    }
    if (this.admin.password != '') {
      this.takenAdmin.password = this.admin.password;
    }
    if (this.admin.confirmPassword != '') {
      this.takenAdmin.confirmPassword = this.admin.confirmPassword;
    }
  }
  
  //Get categories of this admin.. 
  categoriesText: string = '';
  categories: Category[] = [];
  inCategorires: boolean = false;

  getCategoriesOfAdmin() {
    this.service.getAllCategories()
    .subscribe(
      response => {
        console.log('Categories');
        this.categories = response;
        this.categories.forEach(category => { 
          if(category.adminID == this.adminid){
            this.inCategorires = true;
            this.categoriesText += "Id:" + category.id + " " + "Title:" + category.title + "\n";
          }
        });
        if(!this.inCategorires){
          this.categoriesText += "This admin has no categories.";
        }
      }
    );
  }

  //Get courses of this admin.. 
  coursesText: string = '';
  courses: Course[] = [];
  inCourses: boolean = false;

  getCoursesOfAdmin() {
    this.service.getAllCourses()
    .subscribe(
      response => {
        console.log('Courses');
        this.courses = response;
        this.courses.forEach(course => {
          if(course.adminID == this.adminid){
            this.inCourses = true;
            this.coursesText += "Id:" + course.id + " " + "Title:" + course.title + "\n";
          }
        });
        if(!this.inCourses){
          this.coursesText += "This admin has no courses.";
        }
      }
    );
  }

  //Get sections of this admin.. 
  sectionsText: string = '';
  sections: Section[] = [];
  inSections: boolean = false;

  getSectionsOfAdmin() {
    this.service.getAllSections()
    .subscribe(
      response => {
        console.log('Sections');
        this.sections = response;
        this.sections.forEach(section => {
          if(section.adminID == this.adminid){
            this.inSections = true;
            this.sectionsText += "Id:" + section.id + " " + "Title:" + section.title + "\n";
          }
        });
        if(!this.inSections){
          this.sectionsText += "This admin has no sections.";
        }
      }
    );
  }
}
