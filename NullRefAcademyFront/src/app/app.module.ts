import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { YouTubePlayerModule } from "@angular/youtube-player";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeSiteComponent } from './home-site/home-site.component';
import { HomeHeaderComponent } from './home-site/home-header/home-header.component';
import { HomeFooterComponent } from './home-site/home-footer/home-footer.component';
import { HomeMainComponent } from './home-site/home-main/home-main.component';

import { HomeApiService } from './services/home-api.service';

import { HomeAboutComponent } from './home-site/home-about/home-about.component';
import { HomeContactsComponent } from './home-site/home-contacts/home-contacts.component';
import { HomePrivacyComponent } from './home-site/home-privacy/home-privacy.component';
import { HomeLoginComponent } from './home-site/home-login/home-login.component';
import { HomeRegisterComponent } from './home-site/home-register/home-register.component';
import { AdminSiteComponent } from './admin-site/admin-site.component';
import { AdminNavigationComponent } from './admin-site/admin-navigation/admin-navigation.component';
import { AdminMainComponent } from './admin-site/admin-main/admin-main.component';
import { AdminAddTeacherComponent } from './admin-site/admin-add-teacher/admin-add-teacher.component';
import { AdminShowTeacherComponent } from './admin-site/admin-show-teacher/admin-show-teacher.component';
import { AdminShowAdminComponent } from './admin-site/admin-show-admin/admin-show-admin.component';
import { AdminAddAdminComponent } from './admin-site/admin-add-admin/admin-add-admin.component';
import { AdminShowUserComponent } from './admin-site/admin-show-user/admin-show-user.component';
import { AdminAddUserComponent } from './admin-site/admin-add-user/admin-add-user.component';
import { AdminShowStudentComponent } from './admin-site/admin-show-student/admin-show-student.component';
import { AdminAddStudentComponent } from './admin-site/admin-add-student/admin-add-student.component';
import { AdminAddCategoryComponent } from './admin-site/admin-add-category/admin-add-category.component';
import { AdminShowCategoryComponent } from './admin-site/admin-show-category/admin-show-category.component';
import { AdminShowCourseComponent } from './admin-site/admin-show-course/admin-show-course.component';
import { AdminAddCourseComponent } from './admin-site/admin-add-course/admin-add-course.component';
import { AdminAddSectionComponent } from './admin-site/admin-add-section/admin-add-section.component';
import { AdminShowSectionComponent } from './admin-site/admin-show-section/admin-show-section.component';
import { AdminDeleteAdminComponent } from './admin-site/admin-delete-admin/admin-delete-admin.component';
import { AdminDeleteTeacherComponent } from './admin-site/admin-delete-teacher/admin-delete-teacher.component';
import { AdminDeleteStudentComponent } from './admin-site/admin-delete-student/admin-delete-student.component';
import { AdminDeleteCategoryComponent } from './admin-site/admin-delete-category/admin-delete-category.component';
import { AdminDeleteCourseComponent } from './admin-site/admin-delete-course/admin-delete-course.component';
import { AdminDeleteSectionComponent } from './admin-site/admin-delete-section/admin-delete-section.component';
import { AdminUpdateAdminComponent } from './admin-site/admin-update-admin/admin-update-admin.component';
import { AdminUpdateTeacherComponent } from './admin-site/admin-update-teacher/admin-update-teacher.component';
import { AdminUpdateStudentComponent } from './admin-site/admin-update-student/admin-update-student.component';
import { AdminUpdateCategoryComponent } from './admin-site/admin-update-category/admin-update-category.component';
import { AdminUpdateCourseComponent } from './admin-site/admin-update-course/admin-update-course.component';
import { AdminUpdateSectionComponent } from './admin-site/admin-update-section/admin-update-section.component';
import { StudentSiteComponent } from './student-site/student-site.component';
import { StudentHeaderComponent } from './student-site/student-header/student-header.component';
import { StudentFooterComponent } from './student-site/student-footer/student-footer.component';
import { StudentAboutComponent } from './student-site/student-about/student-about.component';
import { StudentContactsComponent } from './student-site/student-contacts/student-contacts.component';
import { StudentMainComponent } from './student-site/student-main/student-main.component';
import { StudentCategoriesComponent } from './student-site/student-categories/student-categories.component';
import { StudentCoursesComponent } from './student-site/student-courses/student-courses.component';
import { StudentSectionsComponent } from './student-site/student-sections/student-sections.component';
import { StudentCategoryComponent } from './student-site/student-category/student-category.component';
import { StudentCourseComponent } from './student-site/student-course/student-course.component';
import { StudentEnrollcourseComponent } from './student-site/student-enrollcourse/student-enrollcourse.component';
import { TeacherSiteComponent } from './teacher-site/teacher-site.component';
import { TeacherHeaderComponent } from './teacher-site/teacher-header/teacher-header.component';
import { TeacherFooterComponent } from './teacher-site/teacher-footer/teacher-footer.component';
import { TeacherMainComponent } from './teacher-site/teacher-main/teacher-main.component';
import { StudentSettingsComponent } from './student-site/student-settings/student-settings.component';
import { TeacherAboutComponent } from './teacher-site/teacher-about/teacher-about.component';
import { TeacherContactsComponent } from './teacher-site/teacher-contacts/teacher-contacts.component';
import { TeacherAddCourseComponent } from './teacher-site/teacher-add-course/teacher-add-course.component';
import { TeacherDeleteCourseComponent } from './teacher-site/teacher-delete-course/teacher-delete-course.component';
import { TeacherUpdateCourseComponent } from './teacher-site/teacher-update-course/teacher-update-course.component';
import { TeacherAddCategoryComponent } from './teacher-site/teacher-add-category/teacher-add-category.component';
import { TeacherDeleteCategoryComponent } from './teacher-site/teacher-delete-category/teacher-delete-category.component';
import { TeacherUpdateCategoryComponent } from './teacher-site/teacher-update-category/teacher-update-category.component';
import { TeacherUpdateSectionComponent } from './teacher-site/teacher-update-section/teacher-update-section.component';
import { TeacherDeleteSectionComponent } from './teacher-site/teacher-delete-section/teacher-delete-section.component';
import { TeacherAddSectionComponent } from './teacher-site/teacher-add-section/teacher-add-section.component';
import { TeacherSettingsComponent } from './teacher-site/teacher-settings/teacher-settings.component';
import { TeacherCategoriesComponent } from './teacher-site/teacher-categories/teacher-categories.component';
import { TeacherCoursesComponent } from './teacher-site/teacher-courses/teacher-courses.component';
import { TeacherSectionsComponent } from './teacher-site/teacher-sections/teacher-sections.component';
import { TeacherCategoryComponent } from './teacher-site/teacher-category/teacher-category.component';
import { TeacherCourseComponent } from './teacher-site/teacher-course/teacher-course.component';
import { TeacherPreviewcourseComponent } from './teacher-site/teacher-previewcourse/teacher-previewcourse.component';
import { StudentProfileTeacherComponent } from './student-site/student-profile-teacher/student-profile-teacher.component';
import { StudentProfileStudentComponent } from './student-site/student-profile-student/student-profile-student.component';
import { TeacherProfileStudentComponent } from './teacher-site/teacher-profile-student/teacher-profile-student.component';
import { TeacherProfileTeacherComponent } from './teacher-site/teacher-profile-teacher/teacher-profile-teacher.component';
import { AdminAddArticleComponent } from './admin-site/admin-add-article/admin-add-article.component';
import { AdminDeleteArticleComponent } from './admin-site/admin-delete-article/admin-delete-article.component';
import { AdminShowArticleComponent } from './admin-site/admin-show-article/admin-show-article.component';
import { AdminUpdateArticleComponent } from './admin-site/admin-update-article/admin-update-article.component';
import { StudentArticlesComponent } from './student-site/student-articles/student-articles.component';
import { StudentArticleComponent } from './student-site/student-article/student-article.component';
import { TeacherAddArticleComponent } from './teacher-site/teacher-add-article/teacher-add-article.component';
import { TeacherDeleteArticleComponent } from './teacher-site/teacher-delete-article/teacher-delete-article.component';
import { TeacherUpdateArticleComponent } from './teacher-site/teacher-update-article/teacher-update-article.component';
import { TeacherArticlesComponent } from './teacher-site/teacher-articles/teacher-articles.component';
import { TeacherArticleComponent } from './teacher-site/teacher-article/teacher-article.component';
import { AdminAddNewsComponent } from './admin-site/admin-add-news/admin-add-news.component';
import { AdminDeleteNewsComponent } from './admin-site/admin-delete-news/admin-delete-news.component';
import { AdminShowNewsComponent } from './admin-site/admin-show-news/admin-show-news.component';
import { AdminUpdateNewsComponent } from './admin-site/admin-update-news/admin-update-news.component';
import { StudentNewsComponent } from './student-site/student-news/student-news.component';
import { StudentNewssComponent } from './student-site/student-newss/student-newss.component';
import { TeacherNewsComponent } from './teacher-site/teacher-news/teacher-news.component';
import { TeacherNewssComponent } from './teacher-site/teacher-newss/teacher-newss.component';
import { StudentEnrollArticleComponent } from './student-site/student-enrollarticle/student-enrollarticle.component';
import { StudentEnrollNewsComponent } from './student-site/student-enrollnews/student-enrollnews.component';
import { TeacherEnrollArticleComponent } from './teacher-site/teacher-enrollarticle/teacher-enrollarticle.component';
import { TeacherEnrollNewsComponent } from './teacher-site/teacher-enrollnews/teacher-enrollnews.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeSiteComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    HomeMainComponent,
    HomeAboutComponent,
    HomeContactsComponent,
    HomePrivacyComponent,
    HomeLoginComponent,
    HomeRegisterComponent,
    AdminSiteComponent,
    AdminNavigationComponent,
    AdminMainComponent,
    AdminAddTeacherComponent,
    AdminShowTeacherComponent,
    AdminShowAdminComponent,
    AdminAddAdminComponent,
    AdminShowUserComponent,
    AdminAddUserComponent,
    AdminAddNewsComponent,
    AdminShowStudentComponent,
    AdminAddStudentComponent,
    AdminAddCategoryComponent,
    AdminShowCategoryComponent,
    AdminShowCourseComponent,
    AdminAddCourseComponent,
    AdminAddSectionComponent,
    AdminAddArticleComponent,
    AdminShowSectionComponent,
    AdminShowArticleComponent,
    AdminShowNewsComponent,
    AdminDeleteAdminComponent,
    AdminDeleteTeacherComponent,
    AdminDeleteStudentComponent,
    AdminDeleteCategoryComponent,
    AdminDeleteCourseComponent,
    AdminDeleteSectionComponent,
    AdminDeleteArticleComponent,
    AdminDeleteNewsComponent,
    AdminUpdateAdminComponent,
    AdminUpdateTeacherComponent,
    AdminUpdateStudentComponent,
    AdminUpdateCategoryComponent,
    AdminUpdateCourseComponent,
    AdminUpdateSectionComponent,
    AdminUpdateArticleComponent,
    AdminUpdateNewsComponent,
    StudentSiteComponent,
    StudentHeaderComponent,
    StudentFooterComponent,
    StudentAboutComponent,
    StudentContactsComponent,
    StudentMainComponent,
    StudentCategoriesComponent,
    StudentCoursesComponent,
    StudentArticlesComponent,
    StudentArticleComponent,
    StudentNewsComponent,
    StudentNewssComponent,
    StudentSectionsComponent,
    StudentCategoryComponent,
    StudentCourseComponent,
    StudentEnrollcourseComponent,
    StudentEnrollArticleComponent,
    StudentEnrollNewsComponent,
    TeacherSiteComponent,
    TeacherHeaderComponent,
    TeacherFooterComponent,
    TeacherMainComponent,
    StudentSettingsComponent,
    TeacherAboutComponent,
    TeacherContactsComponent,
    TeacherAddCourseComponent,
    TeacherAddArticleComponent,
    TeacherDeleteCourseComponent,
    TeacherUpdateCourseComponent,
    TeacherAddCategoryComponent,
    TeacherDeleteCategoryComponent,
    TeacherDeleteArticleComponent,
    TeacherUpdateCategoryComponent,
    TeacherUpdateSectionComponent,
    TeacherUpdateArticleComponent,
    TeacherDeleteSectionComponent,
    TeacherAddSectionComponent,
    TeacherSettingsComponent,
    TeacherCategoriesComponent,
    TeacherCoursesComponent,
    TeacherSectionsComponent,
    TeacherCategoryComponent,
    TeacherCourseComponent,
    TeacherArticlesComponent,
    TeacherArticleComponent,
    TeacherNewsComponent,
    TeacherNewssComponent,
    TeacherPreviewcourseComponent,
    StudentProfileTeacherComponent,
    StudentProfileStudentComponent,
    TeacherProfileStudentComponent,
    TeacherProfileTeacherComponent,
    TeacherEnrollArticleComponent,
    TeacherEnrollNewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    YouTubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
