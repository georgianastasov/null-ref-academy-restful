import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin.model';
import { Category } from '../models/category.model';
import { Course } from '../models/course.model';
import { Section } from '../models/section.model';
import { Student } from '../models/student.model';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherApiService {

  readonly userUrl = "https://localhost:44378/api/User";
  readonly adminUrl = "https://localhost:44378/api/Admin";
  readonly teacherUrl = "https://localhost:44378/api/Teacher";
  readonly studentUrl = "https://localhost:44378/api/Student";
  readonly categoryUrl = "https://localhost:44378/api/Category";
  readonly courseUrl = "https://localhost:44378/api/Course";
  readonly sectionUrl = "https://localhost:44378/api/Section";
  constructor(private http: HttpClient, private router: Router) { }
  
  getAllAdmins(): Observable<Admin[]>{
    return this.http.get<Admin[]>(this.adminUrl + '/GetAllAdmins');
  }

  getAllTeachers(): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(this.teacherUrl + '/GetAllTeachers');
  }

  getTeacher(id: number): Observable<Teacher>{
    return this.http.get<Teacher>(this.teacherUrl + '/GetTeacher/' + id);
  }
  
  updateTeacher(id: number, teacher: Teacher): Observable<any>{
    return this.http.put<Teacher>(this.teacherUrl + '/UpdateTeacher/' + id, teacher);
  }

  getAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.studentUrl + '/GetAllStudents');
  }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.categoryUrl + '/GetAllCategories');
  }

  getCategory(id: number): Observable<Category>{
    return this.http.get<Category>(this.categoryUrl + '/GetCategory/' + id);
  }

  createCategory(category: Category): Observable<any>{
    return this.http.post<Category>(this.categoryUrl + '/CreateCategory', category);
  }

  deleteCategory(id: number): Observable<any>{
    return this.http.delete<Category>(this.categoryUrl + '/DeleteCategory/' + id);
  }

  updateCategory(id: number, category: Category): Observable<any>{
    return this.http.put<Category>(this.categoryUrl + '/UpdateCategory/' + id, category);
  }

  getAllCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(this.courseUrl + '/GetAllCourses');
  }
  
  getCourse(id: number): Observable<Course>{
    return this.http.get<Course>(this.courseUrl + '/GetCourse/' + id);
  }

  createCourse(course: Course): Observable<any>{
    return this.http.post<Course>(this.courseUrl + '/CreateCourse', course);
  }

  deleteCourse(id: number): Observable<any>{
    return this.http.delete<Course>(this.courseUrl + '/DeleteCourse/' + id);
  }

  updateCourse(id: number, course: Course): Observable<any>{
    return this.http.put<Course>(this.courseUrl + '/UpdateCourse/' + id, course);
  }

  getAllSections(): Observable<Section[]>{
    return this.http.get<Section[]>(this.sectionUrl + '/GetAllSections');
  }

  getSection(id: number): Observable<Section>{
    return this.http.get<Section>(this.sectionUrl + '/GetSection/' + id);
  }

  createSection(section: Section): Observable<any>{
    return this.http.post<Section>(this.sectionUrl + '/CreateSection', section);
  }

  deleteSection(id: number): Observable<any>{
    return this.http.delete<Section>(this.sectionUrl + '/DeleteSection/' + id);
  }

  updateSection(id: number, section: Section): Observable<any>{
    return this.http.put<Section>(this.sectionUrl + '/UpdateSection/' + id, section);
  }
}
