import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-show-course',
  templateUrl: './admin-show-course.component.html',
  styleUrls: ['./admin-show-course.component.css']
})
export class AdminShowCourseComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: AdminApiService, private route: ActivatedRoute) { }

  admins: Admin[] = [];
  teachers: Teacher[] = [];
  categories: Category[] = [];
  courses: Course[] = [];
  sections: Section[] = [];
  count = 0;

  ngOnInit(): void {
    this.getAllAdmins();
    this.getAllTeachers();
    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
    });

    this.getStudentsOfCourses();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.routeid = 0;
  }

  getAllAdmins(){
    this.service.getAllAdmins()
    .subscribe(
      response => {
        console.log('Admins');
        this.admins = response;
        console.log(this.admins);
      }
    );
  }

  getAllTeachers(){
    this.service.getAllTeachers()
    .subscribe(
      response => {
        console.log('Teachers');
        this.teachers = response;
        console.log(this.teachers);
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

  //Get students of this course.. 
  studentText: string = '';
  courses2: Course[] = [];
  students2: Student[] = [];
  inStudents: boolean = false;
  array: string[] = [];
  studentid: number = 0;
  studentTextArray: string[] = [];

  getStudentsOfCourses() {
    this.service.getAllStudents()
      .subscribe(
        response => {
          console.log('StudentsA');
          this.students2 = response;
          this.service.getAllCourses()
            .subscribe(
              response => {
                console.log('CoursesA');
                this.courses2 = response;
                this.courses2.forEach(course => {
                  if (course.studentsIDs != null) {
                    this.array = course.studentsIDs.split(',');
                    this.removeNull(this.array);
                    for (let i = 0; i < this.array.length; i++) {
                      this.studentid = parseInt(this.array[i]);
                      this.students2.forEach(student => {
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

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };
}
