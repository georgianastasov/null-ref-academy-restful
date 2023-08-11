import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { catchError, map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Admin } from '../models/admin.model';
import { Teacher } from '../models/teacher.model';
import { Student } from '../models/student.model';
import { Category } from '../models/category.model';
import { Course } from '../models/course.model';
import { Section } from '../models/section.model';
import { Article } from '../models/article.model';
import { News } from '../models/news.model';


@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  readonly userUrl = "https://localhost:44378/api/User";
  readonly adminUrl = "https://localhost:44378/api/Admin";
  readonly teacherUrl = "https://localhost:44378/api/Teacher";
  readonly studentUrl = "https://localhost:44378/api/Student";
  readonly categoryUrl = "https://localhost:44378/api/Category";
  readonly courseUrl = "https://localhost:44378/api/Course";
  readonly sectionUrl = "https://localhost:44378/api/Section";
  readonly articleUrl = "https://localhost:44378/api/Article";
  readonly newsUrl = "https://localhost:44378/api/News";
  constructor(private http: HttpClient, private router: Router) { }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.userUrl + '/GetAllUsers');
  }

  getUser(id: number): Observable<any>{
    return this.http.get<any>(this.userUrl + '/GetUser/' + id);
  }

  addUser(user: User): Observable<any>{
    return this.http.post<User>(this.userUrl + '/AddUser', user);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete<User>(this.userUrl + '/DeleteUser/' + id);
  }

  updateUser(id: number, user: User): Observable<any>{
    return this.http.put<User>(this.userUrl + '/UpdateUser/' + id, user);
  }

  getAllAdmins(): Observable<Admin[]>{
    return this.http.get<Admin[]>(this.adminUrl + '/GetAllAdmins');
  }

  getAdmin(id: number): Observable<Admin>{
    return this.http.get<Admin>(this.adminUrl + '/GetAdmin/' + id);
  }

  addAdmin(admin: Admin): Observable<any>{
    return this.http.post<Admin>(this.adminUrl + '/AddAdmin', admin);
  }

  deleteAdmin(id: number): Observable<any>{
    return this.http.delete<Admin>(this.adminUrl + '/DeleteAdmin/' + id);
  }

  updateAdmin(id: number, admin: Admin): Observable<any>{
    return this.http.put<Admin>(this.adminUrl + '/UpdateAdmin/' + id, admin);
  }

  getAllTeachers(): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(this.teacherUrl + '/GetAllTeachers');
  }

  getTeacher(id: number): Observable<Teacher>{
    return this.http.get<Teacher>(this.teacherUrl + '/GetTeacher/' + id);
  }

  addTeacher(teacher: Teacher): Observable<any>{
    return this.http.post<Teacher>(this.teacherUrl + '/AddTeacher', teacher);
  }

  deleteTeacher(id: number): Observable<any>{
    return this.http.delete<Teacher>(this.teacherUrl + '/DeleteTeacher/' + id);
  }

  updateTeacher(id: number, teacher: Teacher): Observable<any>{
    return this.http.put<Teacher>(this.teacherUrl + '/UpdateTeacher/' + id, teacher);
  }

  getAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.studentUrl + '/GetAllStudents');
  }

  getStudent(id: number): Observable<Student>{
    return this.http.get<Student>(this.studentUrl + '/GetStudent/' + id);
  }

  addStudent(student: Student): Observable<any>{
    return this.http.post<Student>(this.studentUrl + '/AddStudent', student);
  }

  deleteStudent(id: number): Observable<any>{
    return this.http.delete<Student>(this.studentUrl + '/DeleteStudent/' + id);
  }

  updateStudent(id: number, student: Student): Observable<any>{
    return this.http.put<Student>(this.studentUrl + '/UpdateStudent/' + id, student);
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

  getAllArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(this.articleUrl + '/GetAllArticles');
  }

  getArticle(id: number): Observable<Article>{
    return this.http.get<Article>(this.articleUrl + '/GetArticle/' + id);
  }

  addArticle(article: Article): Observable<any>{
    return this.http.post<Article>(this.articleUrl + '/CreateArticle', article);
  }

  deleteArticle(id: number): Observable<any>{
    return this.http.delete<Article>(this.articleUrl + '/DeleteArticle/' + id);
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

  addNews(news: News): Observable<any>{
    return this.http.post<News>(this.newsUrl + '/CreateNews', news);
  }

  deleteNews(id: number): Observable<any>{
    return this.http.delete<News>(this.newsUrl + '/DeleteNews/' + id);
  }

  updateNews(id: number, news: News): Observable<any>{
    return this.http.put<News>(this.newsUrl + '/UpdateNews/' + id, news);
  }
}