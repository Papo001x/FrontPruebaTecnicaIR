import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './components/layout/private.component';
import { PrivateRoutingModule } from './private-routing.module';
import { SharedModule } from '../shared/shared.module';

import { UsersComponent } from './page/users/users.component';
import { UserFormComponent } from './page/user-form/user-form.component';
import { ProgramsComponent } from './page/programs/programs.component';
import { SubjectComponent } from './page/subjects/subject.component';
import { ProgramsFormComponent } from './page/programs-form/programs-form.component';
import { SubjectFormComponent } from './page/subject-form/subject-form.component';
import { ProgramsLinkSubjectComponent } from './page/programs-link-subject/programs-link-subject.component';
import { UserDashboardComponent } from './page/user-dashboard/user-dashboard.component';
import { ClassListComponent } from './page/class-list/class-list.component';

@NgModule({
  declarations: [PrivateComponent, UsersComponent, UserFormComponent, ProgramsComponent, SubjectComponent, ProgramsFormComponent, SubjectFormComponent, ProgramsLinkSubjectComponent, UserDashboardComponent, ClassListComponent],
  imports: [CommonModule, PrivateRoutingModule, SharedModule],
})
export class PrivateModule {}
