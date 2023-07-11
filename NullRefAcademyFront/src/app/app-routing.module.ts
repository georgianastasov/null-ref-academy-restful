import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddAdminComponent } from './admin-site/admin-add-admin/admin-add-admin.component';
import { AdminAddCategoryComponent } from './admin-site/admin-add-category/admin-add-category.component';
import { AdminAddCourseComponent } from './admin-site/admin-add-course/admin-add-course.component';
import { AdminAddSectionComponent } from './admin-site/admin-add-section/admin-add-section.component';
import { AdminAddStudentComponent } from './admin-site/admin-add-student/admin-add-student.component';
import { AdminAddTeacherComponent } from './admin-site/admin-add-teacher/admin-add-teacher.component';
import { AdminAddUserComponent } from './admin-site/admin-add-user/admin-add-user.component';
import { AdminDeleteAdminComponent } from './admin-site/admin-delete-admin/admin-delete-admin.component';
import { AdminDeleteCategoryComponent } from './admin-site/admin-delete-category/admin-delete-category.component';
import { AdminDeleteCourseComponent } from './admin-site/admin-delete-course/admin-delete-course.component';
import { AdminDeleteSectionComponent } from './admin-site/admin-delete-section/admin-delete-section.component';
import { AdminDeleteStudentComponent } from './admin-site/admin-delete-student/admin-delete-student.component';
import { AdminDeleteTeacherComponent } from './admin-site/admin-delete-teacher/admin-delete-teacher.component';
import { AdminMainComponent } from './admin-site/admin-main/admin-main.component';
import { AdminNavigationComponent } from './admin-site/admin-navigation/admin-navigation.component';
import { AdminShowAdminComponent } from './admin-site/admin-show-admin/admin-show-admin.component';
import { AdminShowCategoryComponent } from './admin-site/admin-show-category/admin-show-category.component';
import { AdminShowCourseComponent } from './admin-site/admin-show-course/admin-show-course.component';
import { AdminShowSectionComponent } from './admin-site/admin-show-section/admin-show-section.component';
import { AdminShowStudentComponent } from './admin-site/admin-show-student/admin-show-student.component';
import { AdminShowTeacherComponent } from './admin-site/admin-show-teacher/admin-show-teacher.component';
import { AdminShowUserComponent } from './admin-site/admin-show-user/admin-show-user.component';
import { AdminSiteComponent } from './admin-site/admin-site.component';
import { AdminUpdateAdminComponent } from './admin-site/admin-update-admin/admin-update-admin.component';
import { AdminUpdateCategoryComponent } from './admin-site/admin-update-category/admin-update-category.component';
import { AdminUpdateCourseComponent } from './admin-site/admin-update-course/admin-update-course.component';
import { AdminUpdateSectionComponent } from './admin-site/admin-update-section/admin-update-section.component';
import { AdminUpdateStudentComponent } from './admin-site/admin-update-student/admin-update-student.component';
import { AdminUpdateTeacherComponent } from './admin-site/admin-update-teacher/admin-update-teacher.component';
import { HomeAboutComponent } from './home-site/home-about/home-about.component';
import { HomeContactsComponent } from './home-site/home-contacts/home-contacts.component';
import { HomeLoginComponent } from './home-site/home-login/home-login.component';
import { HomeMainComponent } from './home-site/home-main/home-main.component';
import { HomeRegisterComponent } from './home-site/home-register/home-register.component';
import { HomeSiteComponent } from './home-site/home-site.component';
import { AdminApiService } from './services/admin-api.service';
import { StudentAboutComponent } from './student-site/student-about/student-about.component';
import { StudentCategoriesComponent } from './student-site/student-categories/student-categories.component';
import { StudentCategoryComponent } from './student-site/student-category/student-category.component';
import { StudentContactsComponent } from './student-site/student-contacts/student-contacts.component';
import { StudentCourseComponent } from './student-site/student-course/student-course.component';
import { StudentCoursesComponent } from './student-site/student-courses/student-courses.component';
import { StudentEnrollcourseComponent } from './student-site/student-enrollcourse/student-enrollcourse.component';
import { StudentMainComponent } from './student-site/student-main/student-main.component';
import { StudentProfileStudentComponent } from './student-site/student-profile-student/student-profile-student.component';
import { StudentProfileTeacherComponent } from './student-site/student-profile-teacher/student-profile-teacher.component';
import { StudentSectionsComponent } from './student-site/student-sections/student-sections.component';
import { StudentSettingsComponent } from './student-site/student-settings/student-settings.component';
import { TeacherAboutComponent } from './teacher-site/teacher-about/teacher-about.component';
import { TeacherAddCategoryComponent } from './teacher-site/teacher-add-category/teacher-add-category.component';
import { TeacherAddCourseComponent } from './teacher-site/teacher-add-course/teacher-add-course.component';
import { TeacherAddSectionComponent } from './teacher-site/teacher-add-section/teacher-add-section.component';
import { TeacherCategoriesComponent } from './teacher-site/teacher-categories/teacher-categories.component';
import { TeacherCategoryComponent } from './teacher-site/teacher-category/teacher-category.component';
import { TeacherContactsComponent } from './teacher-site/teacher-contacts/teacher-contacts.component';
import { TeacherCourseComponent } from './teacher-site/teacher-course/teacher-course.component';
import { TeacherCoursesComponent } from './teacher-site/teacher-courses/teacher-courses.component';
import { TeacherDeleteCategoryComponent } from './teacher-site/teacher-delete-category/teacher-delete-category.component';
import { TeacherDeleteCourseComponent } from './teacher-site/teacher-delete-course/teacher-delete-course.component';
import { TeacherDeleteSectionComponent } from './teacher-site/teacher-delete-section/teacher-delete-section.component';
import { TeacherMainComponent } from './teacher-site/teacher-main/teacher-main.component';
import { TeacherPreviewcourseComponent } from './teacher-site/teacher-previewcourse/teacher-previewcourse.component';
import { TeacherProfileStudentComponent } from './teacher-site/teacher-profile-student/teacher-profile-student.component';
import { TeacherProfileTeacherComponent } from './teacher-site/teacher-profile-teacher/teacher-profile-teacher.component';
import { TeacherSectionsComponent } from './teacher-site/teacher-sections/teacher-sections.component';
import { TeacherSettingsComponent } from './teacher-site/teacher-settings/teacher-settings.component';
import { TeacherUpdateCategoryComponent } from './teacher-site/teacher-update-category/teacher-update-category.component';
import { TeacherUpdateCourseComponent } from './teacher-site/teacher-update-course/teacher-update-course.component';
import { TeacherUpdateSectionComponent } from './teacher-site/teacher-update-section/teacher-update-section.component';

const routes: Routes = [
  {
    path: '',
    component: HomeMainComponent
  },
  {
    path: 'Home/Main',
    component: HomeMainComponent
  },
  {
    path: 'Home/About',
    component: HomeAboutComponent
  },
  {
    path: 'Home/Contacts',
    component: HomeContactsComponent
  },
  {
    path: 'Home/Login',
    component: HomeLoginComponent
  },
  {
    path: 'Home/Register',
    component: HomeRegisterComponent
  },
  {
    path: 'Admin/:id/Dashboard',
    component: AdminMainComponent
  },
  {
    path: 'Admin/:id/Users',
    component: AdminShowUserComponent
  },
  {
    path: 'Admin/:id/Add/User',
    component: AdminAddUserComponent
  },
  {
    path: 'Admin/:id/Admins',
    component: AdminShowAdminComponent
  },
  {
    path: 'Admin/:id/Add/Admin',
    component: AdminAddAdminComponent
  },
  {
    path: 'Admin/:id/Delete/Admin/:id2',
    component: AdminDeleteAdminComponent
  },
  {
    path: 'Admin/:id/Update/Admin/:id2',
    component: AdminUpdateAdminComponent
  },
  {
    path: 'Admin/:id/Teachers',
    component: AdminShowTeacherComponent
  },
  {
    path: 'Admin/:id/Add/Teacher',
    component: AdminAddTeacherComponent
  },
  {
    path: 'Admin/:id/Delete/Teacher/:id2',
    component: AdminDeleteTeacherComponent
  },
  {
    path: 'Admin/:id/Update/Teacher/:id2',
    component: AdminUpdateTeacherComponent
  },
  {
    path: 'Admin/:id/Students',
    component: AdminShowStudentComponent
  },
  {
    path: 'Admin/:id/Add/Student',
    component: AdminAddStudentComponent
  },
  {
    path: 'Admin/:id/Delete/Student/:id2',
    component: AdminDeleteStudentComponent
  },
  {
    path: 'Admin/:id/Update/Student/:id2',
    component: AdminUpdateStudentComponent
  },
  {
    path: 'Admin/:id/Categories',
    component: AdminShowCategoryComponent
  },
  {
    path: 'Admin/:id/Add/Category',
    component: AdminAddCategoryComponent
  },
  {
    path: 'Admin/:id/Delete/Category/:id2',
    component: AdminDeleteCategoryComponent
  },
  {
    path: 'Admin/:id/Update/Category/:id2',
    component: AdminUpdateCategoryComponent
  },
  {
    path: 'Admin/:id/Courses',
    component: AdminShowCourseComponent
  },
  {
    path: 'Admin/:id/Add/Course',
    component: AdminAddCourseComponent
  },
  {
    path: 'Admin/:id/Delete/Course/:id2',
    component: AdminDeleteCourseComponent
  },
  {
    path: 'Admin/:id/Update/Course/:id2',
    component: AdminUpdateCourseComponent
  },
  {
    path: 'Admin/:id/Sections',
    component: AdminShowSectionComponent
  },
  {
    path: 'Admin/:id/Add/Section',
    component: AdminAddSectionComponent
  },
  {
    path: 'Admin/:id/Delete/Section/:id2',
    component: AdminDeleteSectionComponent
  },
  {
    path: 'Admin/:id/Update/Section/:id2',
    component: AdminUpdateSectionComponent
  },
  {
    path: 'Student/:id/Dashboard',
    component: StudentMainComponent
  },
  {
    path: 'Student/:id/About',
    component: StudentAboutComponent
  },
  {
    path: 'Student/:id/Contacts',
    component: StudentContactsComponent
  },
  {
    path: 'Student/:id/Categories',
    component: StudentCategoriesComponent
  },
  {
    path: 'Student/:id/Category/:id2',
    component: StudentCategoryComponent
  },
  {
    path: 'Student/:id/Courses',
    component: StudentCoursesComponent
  },
  {
    path: 'Student/:id/Course/:id2',
    component: StudentCourseComponent
  },
  {
    path: 'Student/:id/Course/:id2/Enroll',
    component: StudentEnrollcourseComponent
  },
  {
    path: 'Student/:id/Sections',
    component: StudentSectionsComponent
  },
  {
    path: 'Student/:id/Settings',
    component: StudentSettingsComponent
  },
  {
    path: 'Student/:id/Profile/Teacher/:id2',
    component: StudentProfileTeacherComponent
  },
  {
    path: 'Student/:id/Profile/Student/:id2',
    component: StudentProfileStudentComponent
  },
  {
    path: 'Teacher/:id/Dashboard',
    component: TeacherMainComponent
  },
  {
    path: 'Teacher/:id/About',
    component: TeacherAboutComponent
  },
  {
    path: 'Teacher/:id/Contacts',
    component: TeacherContactsComponent
  },
  {
    path: 'Teacher/:id/Add/Category',
    component: TeacherAddCategoryComponent
  },
  {
    path: 'Teacher/:id/Delete/Category/:id2',
    component: TeacherDeleteCategoryComponent
  },
  {
    path: 'Teacher/:id/Update/Category/:id2',
    component: TeacherUpdateCategoryComponent
  },
  {
    path: 'Teacher/:id/Add/Course',
    component: TeacherAddCourseComponent
  },
  {
    path: 'Teacher/:id/Delete/Course/:id2',
    component: TeacherDeleteCourseComponent
  },
  {
    path: 'Teacher/:id/Update/Course/:id2',
    component: TeacherUpdateCourseComponent
  },
  {
    path: 'Teacher/:id/Add/Section',
    component: TeacherAddSectionComponent
  },
  {
    path: 'Teacher/:id/Delete/Section/:id2',
    component: TeacherDeleteSectionComponent
  },
  {
    path: 'Teacher/:id/Update/Section/:id2',
    component: TeacherUpdateSectionComponent
  },
  {
    path: 'Teacher/:id/Settings',
    component: TeacherSettingsComponent
  },
  {
    path: 'Teacher/:id/Categories',
    component: TeacherCategoriesComponent
  },
  {
    path: 'Teacher/:id/Category/:id2',
    component: TeacherCategoryComponent
  },
  {
    path: 'Teacher/:id/Courses',
    component: TeacherCoursesComponent
  },
  {
    path: 'Teacher/:id/Course/:id2',
    component: TeacherCourseComponent
  },
  {
    path: 'Teacher/:id/Sections',
    component: TeacherSectionsComponent
  },
  {
    path: 'Teacher/:id/Course/:id2/Preview',
    component: TeacherPreviewcourseComponent
  },
  {
    path: 'Teacher/:id/Profile/Teacher/:id2',
    component: TeacherProfileTeacherComponent
  },
  {
    path: 'Teacher/:id/Profile/Student/:id2',
    component: TeacherProfileStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
