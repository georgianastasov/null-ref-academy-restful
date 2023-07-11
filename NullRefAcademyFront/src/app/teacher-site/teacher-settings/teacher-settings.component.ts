import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherApiService } from 'src/app/services/teacher-api.service';

@Component({
  selector: 'app-teacher-settings',
  templateUrl: './teacher-settings.component.html',
  styleUrls: ['./teacher-settings.component.css']
})
export class TeacherSettingsComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: TeacherApiService, private router: Router, private route: ActivatedRoute) { }

  teacher: Teacher = {
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

  takenTeacher: Teacher = {
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

  categories: Category[] = [];
  courses: Course[] = [];
  sections: Section[] = [];

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
    });

    this.getTeacher();

    this.getCategoriesOfTeacher();
    this.getCoursesOfTeacher();
    this.getSectionsOfTeacher();

    this.getCountCategories();
    this.getCountCourses();
    this.getCountSections();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onSubmit() {
    this.populate();
    this.service.updateTeacher(this.routeid, this.takenTeacher)
    .subscribe(
      response => {
        this.router.navigate(['/Teacher/' + this.routeid + '/Dashboard']);
      }
    )
  }

  populate(){
    if (this.teacher.firstName != '') {
      this.takenTeacher.firstName = this.teacher.firstName;
    }
    if (this.teacher.lastName != '') {
      this.takenTeacher.lastName = this.teacher.lastName;
    }
    if (this.teacher.username != '') {
      this.takenTeacher.username = this.teacher.username;
    }
    if (this.teacher.email != '') {
      this.takenTeacher.email = this.teacher.email;
    }
    if (this.teacher.password != '') {
      this.takenTeacher.password = this.teacher.password;
    }
    if (this.teacher.confirmPassword != '') {
      this.takenTeacher.confirmPassword = this.teacher.confirmPassword;
    }
  }

  getTeacher() {
    this.service.getTeacher(this.routeid)
      .subscribe(
        response => {
          this.takenTeacher = response;
        }
      );
  }

  //Get categories of this teacher.. 
  categoriesText: string = '';
  categories2: Category[] = [];
  inCategorires: boolean = false;

  getCategoriesOfTeacher() {
    this.service.getAllCategories()
    .subscribe(
      response => {
        console.log('Categories');
        this.categories2 = response;
        this.categories2.forEach(category => { 
          if(category.teacherID == this.routeid){
            this.inCategorires = true;
            this.categoriesText += "Id:" + category.id + " " + "Title:" + category.title + "\n";
          }
        });
        if(!this.inCategorires){
          this.categoriesText += "This teacher has no categories.";
        }
      }
    );
  }

  //Get courses of this teacher.. 
  coursesText: string = '';
  courses2: Course[] = [];
  inCourses: boolean = false;

  getCoursesOfTeacher() {
    this.service.getAllCourses()
    .subscribe(
      response => {
        console.log('Courses');
        this.courses2 = response;
        this.courses2.forEach(course => {
          if(course.teacherID == this.routeid){
            this.inCourses = true;
            this.coursesText += "Id:" + course.id + " " + "Title:" + course.title + "\n";
          }
        });
        if(!this.inCourses){
          this.coursesText += "This teacher has no courses.";
        }
      }
    );
  }

  //Get sections of this teacher.. 
  sectionsText: string = '';
  sections2: Section[] = [];
  inSections: boolean = false;

  getSectionsOfTeacher() {
    this.service.getAllSections()
    .subscribe(
      response => {
        console.log('Sections');
        this.sections2 = response;
        this.sections2.forEach(section => {
          if(section.teacherID == this.routeid){
            this.inSections = true;
            this.sectionsText += "Id:" + section.id + " " + "Title:" + section.title + "\n";
          }
        });
        if(!this.inSections){
          this.sectionsText += "This teacher has no sections.";
        }
      }
    );
  }

  countCategories: number = 0;
  getCountCategories() {
    this.service.getAllCategories()
      .subscribe(
        response => {
          this.categories = response;
          this.categories.forEach(category => {
            if (category.teacherID != null) {
              if (category.teacherID == this.routeid) {
                this.countCategories++;
              }
            }
          });
        }
      );
  }

  countCourses: number = 0;
  getCountCourses() {
    this.service.getAllCourses()
      .subscribe(
        response => {
          this.courses = response;
          this.courses.forEach(course => {
            if (course.teacherID != null) {
              if (course.teacherID == this.routeid) {
                this.countCourses++;
              }
            }
          });
        }
      );
  }

  countSections: number = 0;
  getCountSections() {
    this.service.getAllSections()
      .subscribe(
        response => {
          this.sections = response;
          this.sections.forEach(section => {
            if (section.teacherID != null) {
              if (section.teacherID == this.routeid) {
                this.countSections++;
              }
            }
          });
        }
      );
  }

}
