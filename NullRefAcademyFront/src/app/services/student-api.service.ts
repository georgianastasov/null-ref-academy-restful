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
import { Article } from '../models/article.model';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class StudentApiService {

  readonly adminUrl = "https://localhost:44378/api/Admin";
  readonly teacherUrl = "https://localhost:44378/api/Teacher";
  readonly studentUrl = "https://localhost:44378/api/Student";
  readonly categoryUrl = "https://localhost:44378/api/Category";
  readonly courseUrl = "https://localhost:44378/api/Course";
  readonly sectionUrl = "https://localhost:44378/api/Section";
  readonly articleUrl = "https://localhost:44378/api/Article";
  readonly newsUrl = "https://localhost:44378/api/News";
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
  
  getAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.studentUrl + '/GetAllStudents');
  }
  
  getStudent(id: number): Observable<Student>{
    return this.http.get<Student>(this.studentUrl + '/GetStudent/' + id);
  }

  updateStudent(id: number, student: Student): Observable<any>{
    return this.http.put<Student>(this.studentUrl + '/UpdateStudent/' + id, student);
  }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.categoryUrl + '/GetAllCategories');
  }

  getAllCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(this.courseUrl + '/GetAllCourses');
  }

  getCourse(id: number): Observable<Course>{
    return this.http.get<Course>(this.courseUrl + '/GetCourse/' + id);
  }

  updateCourse(id: number, course: Course): Observable<any>{
    return this.http.put<Course>(this.courseUrl + '/UpdateCourse/' + id, course);
  }

  getAllSections(): Observable<Section[]>{
    return this.http.get<Section[]>(this.sectionUrl + '/GetAllSections');
  }

  getAllArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(this.articleUrl + '/GetAllArticles');
  }

  getArticle(id: number): Observable<Article>{
    return this.http.get<Article>(this.articleUrl + '/GetArticle/' + id);
  }

  updateArticle(id: number, article: Article): Observable<any>{
    return this.http.put<Article>(this.articleUrl + '/UpdateArticle/' + id, article);
  }

  getAllNews(): Observable<News[]>{
    return this.http.get<News[]>(this.newsUrl + '/GetAllNews');
  }

  getNews(id: number): Observable<News>{
    return this.http.get<News>(this.newsUrl + '/GetNews/' + id);
  }

  updateNews(id: number, news: News): Observable<any>{
    return this.http.put<News>(this.newsUrl + '/UpdateNews/' + id, news);
  }
}
