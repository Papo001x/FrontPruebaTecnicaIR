import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './page/users/users.component';
import { UserFormComponent } from './page/user-form/user-form.component';
import { ProgramsComponent } from './page/programs/programs.component';
import { SubjectComponent } from './page/subjects/subject.component';
import { ProgramsFormComponent } from './page/programs-form/programs-form.component';
import { SubjectFormComponent } from './page/subject-form/subject-form.component';
import { ProgramsLinkSubjectComponent } from './page/programs-link-subject/programs-link-subject.component';
import { UserDashboardComponent } from './page/user-dashboard/user-dashboard.component';
import { ClassListComponent } from './page/class-list/class-list.component';
import { UserRedirectGuard } from '../../core/guards/UserRedirect.guard';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [UserRedirectGuard],
  },
  { path: 'users/dashboard/:id', component: UserDashboardComponent },
  { path: 'users/create', component: UserFormComponent },
  { path: 'users/edit/:id', component: UserFormComponent },
  { path: 'programs', component: ProgramsComponent },
  { path: 'programs/link/:id', component: ProgramsLinkSubjectComponent },
  { path: 'programs/edit/:id', component: ProgramsFormComponent },
  { path: 'programs/create', component: ProgramsFormComponent },
  { path: 'subjects/edit/:id', component: SubjectFormComponent },
  { path: 'subjects/create', component: SubjectFormComponent },
  { path: 'subjects', component: SubjectComponent },
  { path: 'class/:id', component: ClassListComponent },

  { path: '**', pathMatch: 'prefix', redirectTo: 'users' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
