import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-show-student',
  templateUrl: './admin-show-student.component.html',
  styleUrls: ['./admin-show-student.component.css']
})
export class AdminShowStudentComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: AdminApiService, private route: ActivatedRoute) { }

  students: Student[] = [];
  courses: Course[] = [];

  ngOnInit(): void {
    this.getAllStudents();
    this.getAllCourses();

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
    });

    this.getCoursesOfStudent();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.routeid = 0;
  }

  getAllStudents() {
    this.service.getAllStudents()
      .subscribe(
        response => {
          console.log('Students');
          this.students = response;
          console.log(this.students);
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

  //Get courses of this student.. 
  coursesText: string = '';
  courses2: Course[] = [];
  students2: Student[] = [];
  inCourses: boolean = false;
  array: string[] = [];
  courseArray: string[] = [];
  courseid: number = 0;
  courseTextArray: string[] = [];

  getCoursesOfStudent() {
    this.service.getAllCourses()
      .subscribe(
        response => {
          console.log('CoursesA');
          this.courses2 = response;
          this.service.getAllStudents()
            .subscribe(
              response => {
                console.log('StudentsA');
                this.students2 = response;
                this.students2.forEach(student => {
                  if (student.coursesIDs != null) {
                    this.array = student.coursesIDs.split(',');
                    this.removeNull(this.array);
                    for (let i = 0; i < this.array.length; i++) {
                      this.courseArray = this.array[i].split('=');
                      this.removeNull(this.courseArray);
                      this.courseid = parseInt(this.courseArray[0]);
                      this.courses2.forEach(course => {
                        if (this.courseid == course.id) {
                          this.inCourses = true;
                          this.coursesText += "Id: " + course.id + " " + "Title: " + course.title + ' <span class="line"></span> ';
                        }
                      });
                    }
                    this.courseTextArray[student.id] = this.coursesText;
                    this.coursesText = '';
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
