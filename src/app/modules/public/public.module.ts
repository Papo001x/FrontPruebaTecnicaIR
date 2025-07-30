import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './page/login/login.component';
import { PublicComponent } from './components/layout/public.component';
import { SharedModule } from '../shared/shared.module';
import { LoginService } from './page/login/services/login.service';

@NgModule({
  declarations: [LoginComponent,  PublicComponent],
  imports: [CommonModule, PublicRoutingModule, SharedModule],
  providers: [LoginService],
})
export class PublicModule {}
