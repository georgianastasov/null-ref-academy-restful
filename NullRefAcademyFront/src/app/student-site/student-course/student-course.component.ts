import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
import { StudentCourses } from 'src/app/models/studentcourses.model';
import { Teacher } from 'src/app/models/teacher.model';
import { StudentApiService } from 'src/app/services/student-api.service';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit {

  public routeSub!: Subscription;
  public routeid!: number;
  public courseid!: number;
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
    coursesIDs: '',
    articleIDs: '',
    newsIDs: ''
  }

  course: Course = {
    id: 0,
    title: '',
    description: '',
    points: 0,
    rating: 0,
    ratingQty: 0,
    videoUrl: '',
    createdDate: '',
    categoryID: 0,
    teacherID: 0,
    adminID: 0,
    studentsIDs: '',
    usersStudentsRateIDs: '',
    usersTeachersRateIDs: ''
  }

  admins: Admin[] = [];
  teachers: Teacher[] = [];
  categories: Category[] = [];
  courses: Course[] = [];
  sections: Section[] = [];
  students: Student[] = [];
  studentCourses: StudentCourses[] = [];

  async ngOnInit(): Promise<void> {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.courseid = params['id2'];
      console.log('courseidd: ' + this.courseid)
    });

    this.getStudent();

    this.getAllAdmins();
    this.getAllTeachers();
    this.getAllStudents();
    this.getAllCategories();
    this.getAllCourses();

    this.getAllSections();
    this.sectionsNumbers();
    this.checkEnrollPreview();
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

  getAllAdmins() {
    this.service.getAllAdmins()
    .subscribe(
      response => {
        this.admins = response;
      }
    );
  }

  getAllTeachers() {
    this.service.getAllTeachers()
    .subscribe(
      response => {
        this.teachers = response;
      }
    );
  }

  getAllStudents() {
    this.service.getAllStudents()
    .subscribe(
      response => {
        this.students = response;
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

  public count: number = 0;
  public counts: number[] = [];
  sectionsNumbers(){
    this.service.getAllSections()
      .subscribe(
        response => {
          this.sections.forEach(section => {
            if (section.courseID == this.courseid) {
              this.count++;
              this.counts[section.id] = this.count;
            }
          });
        }
      );
  }

  countStudents(course : any){
    let count = 0
    let array = course.studentsIDs.split(',');
    for (let i = 0; i < array.length; i++) {
      let studentId = parseInt(array[i]);
      this.students.forEach(student => {
        if (studentId === student.id) {
          count++;
        }
      });
    }
    return count;
  }

  public enroll = true;
  public preview = false;
  checkEnrollPreview() {
    this.service.getAllCourses()
      .subscribe(
        response => {
          this.courses = response;
          this.courses.forEach(course => {
            if(course.id === Number(this.courseid)){
                let studentIDs = course.studentsIDs.split(',');
                studentIDs.pop();
                studentIDs.forEach(studentID => {
                  if(Number(studentID) == this.routeid){
                    this.preview = true;
                    this.enroll = false;
                  }
                });
            }
          });
        }
      );
  }

  enrollStudent(){
    this.service.getStudent(this.routeid)
    .subscribe(
      response => {
        this.student = response;
        var date = formatDate(Date.now(), 'dd/MM/YYYY', 'en-US').toString();
        this.student.coursesIDs += this.courseid + '=' + '0' + '=' + date + ',';
        this.service.updateStudent(this.routeid, this.student)
        .subscribe(
          response => {
        })

        this.service.getCourse(this.courseid)
        .subscribe(
          response => {
            this.course = response;
            this.course.studentsIDs += this.routeid + ',';

            this.service.updateCourse(this.courseid, this.course)
              .subscribe(
                response => {
                  setTimeout(() => {
                    this.router.navigate(['/Student/' + this.routeid + '/Course/' + this.courseid + '/Enroll']);
                  }, 100);
              })
          })
      },
    );
  }
}
