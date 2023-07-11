import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherStudent } from 'src/app/models/teacherstudent.model';
import { StudentApiService } from 'src/app/services/student-api.service';

@Component({
  selector: 'app-student-profile-teacher',
  templateUrl: './student-profile-teacher.component.html',
  styleUrls: ['./student-profile-teacher.component.css']
})
export class StudentProfileTeacherComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  teacherid!: number;
  constructor(private service: StudentApiService, private router: Router, private route: ActivatedRoute) { }

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

  categories: Category[] = [];
  courses: Course[] = [];
  sections: Section[] = [];
  students: Student[] = [];

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.teacherid = params['id2'];
    });
    this.getTeacher();

    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();

    this.getStudentsOfTeacher();

    this.getCountCategories();
    this.getCountCourses();
    this.getCountSections();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getTeacher() {
    this.service.getTeacher(this.teacherid)
      .subscribe(
        response => {
          this.teacher = response;
        }
      );
  }

  getAllCategories() {
    this.service.getAllCategories()
      .subscribe(
        response => {
          this.categories = response;
        }
      );
  }

  getAllCourses() {
    this.service.getAllCourses()
      .subscribe(
        response => {
          this.courses = response;
        }
      );
  }

  getAllSections() {
    this.service.getAllSections()
      .subscribe(
        response => {
          this.sections = response;
        }
      );
  }

  //Counts + checks.. 
  countCategories: number = 0;
  hasCreatedCategories: boolean = false;
  countCoursesInCategory: number = 0;
  hasCoursesInCategory: boolean = false;
  getCountCategories() {
    this.service.getAllCategories()
      .subscribe(
        response => {
          this.categories = response;
          this.categories.forEach(category => {
            if (category.teacherID != null) {
              if (category.teacherID == this.teacherid) {
                this.countCategories++;
                this.hasCreatedCategories = true;
                this.service.getAllCourses()
                  .subscribe(
                    response => {
                      this.courses = response;
                      this.courses.forEach(course => {
                        if (course.categoryID == category.id) {
                          this.hasCoursesInCategory = true;
                          this.countCoursesInCategory++;
                        }
                      });
                    }
                  );
              }
            }
          });
        }
      );
  }

  countCourses: number = 0;
  hasCreatedCourses: boolean = false;
  countStudents: number = 0;
  hasStudentsInCourses: boolean = false;
  countSectionsInCourse: number = 0;
  hasSectionsInCourse: boolean = false;
  studentCourse: number[] = [];
  getCountCourses() {
    this.service.getAllCourses()
      .subscribe(
        response => {
          this.courses = response;
          this.courses.forEach(course => {
            if (course.teacherID != null) {
              if (course.teacherID == this.teacherid) {
                this.countCourses++;
                this.hasCreatedCourses = true;
                if (course.studentsIDs != null) {
                  this.hasStudentsInCourses = true;
                  var array = course.studentsIDs.split(',');
                  this.countStudents += array.length - 1;
                  this.studentCourse[course.id] = array.length - 1;
                }
                this.service.getAllSections()
                  .subscribe(
                    response => {
                      this.sections = response;
                      this.sections.forEach(section => {
                        if (section.courseID == course.id) {
                          this.hasSectionsInCourse = true;
                          this.countSectionsInCourse++;
                        }
                      });
                    }
                  );
              }
            }
          });
        }
      );
  }

  countSections: number = 0;
  hasCreatedSections: boolean = false;
  sectionCourse: number[] = [];
  getCountSections() {
    this.service.getAllSections()
      .subscribe(
        response => {
          this.sections = response;
          this.sections.forEach(section => {
            if (section.teacherID != null) {
              if (section.teacherID == this.teacherid) {
                this.countSections++;
                this.hasCreatedSections = true;
              }
              this.service.getAllCourses()
                .subscribe(
                  response => {
                    this.courses = response;
                    this.courses.forEach(course => {
                      if (section.courseID == course.id) {
                        this.sectionCourse[section.id] = course.id;
                      }
                    });
                  }
                );
            }
          });
        }
      );
  }

  //Show menues
  showCategories: boolean = false;
  showCourses: boolean = true;
  showSections: boolean = false;
  showStudents: boolean = false;
  showProfile: boolean = false;

  showCategoriess() {
    this.showCategories = true;
    this.showCourses = false;
    this.showSections = false;
    this.showStudents = false;
    this.showProfile = false;
  }

  showCoursess() {
    this.showCategories = false;
    this.showCourses = true;
    this.showSections = false;
    this.showStudents = false;
    this.showProfile = false;
  }

  showSectionss() {
    this.showCategories = false;
    this.showCourses = false;
    this.showSections = true;
    this.showStudents = false;
    this.showProfile = false;
  }

  showStudentss() {
    this.showCategories = false;
    this.showCourses = false;
    this.showSections = false;
    this.showStudents = true;
    this.showProfile = false;
  }

  showProfilee() {
    this.showCategories = false;
    this.showCourses = false;
    this.showSections = false;
    this.showStudents = false;
    this.showProfile = true;
  }

  //Students..
  teacherStudents: TeacherStudent[] = [];
  count: number = 0;
  array: string[] = [];
  studentid: number = 0;
  innerArray: string[] = [];
  getStudentsOfTeacher() {
    this.service.getAllCourses()
      .subscribe(
        response => {
          this.courses = response;
          this.courses.forEach(course => {
            if (course.teacherID != null) {
              if (course.teacherID == this.teacherid) {
                if (course.studentsIDs != null) {
                  this.array = course.studentsIDs.split(',');
                  for (let i = 0; i < this.array.length; i++) {
                    if (this.array[i] != '' && this.array[i] != null) {
                      this.studentid = Number(this.array[i]);
                      this.service.getAllStudents()
                        .subscribe(
                          response => {
                            this.students = response;
                            this.students.forEach(student => {
                              if (student.id == this.studentid) {
                                this.innerArray = student.coursesIDs.split(',');
                                var element = {
                                  id: student.id,
                                  firstName: student.firstName,
                                  lastName: student.lastName,
                                  username: student.username,
                                  email: student.email,
                                  bio: student.bio,
                                  points: student.points,
                                  courseCount: this.innerArray.length - 1
                                }
                                this.teacherStudents[this.count++] = element;
                              }
                            });
                          }
                        );
                    }
                  }
                }
              }
            }
          });
        }
      );
  }

}
