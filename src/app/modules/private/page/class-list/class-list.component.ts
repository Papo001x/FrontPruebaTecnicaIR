import { Component, OnInit } from '@angular/core';
import { UserProgramsSubjectsService } from '../user-dashboard/services/user-programs-subjects.service';
import { UserResponseDTO } from '../../../../core/interfaces/user.interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-class-list',
  standalone: false,
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.scss',
})
export class ClassListComponent implements OnInit {
  list: UserResponseDTO[] = [];
  columns: string[] = ['id', 'name', 'lastName', 'actions'];
  constructor(
    private readonly userProgramService: UserProgramsSubjectsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    // Initialization logic can go here
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getListUserbByProgramSubject(Number(id));
    }
  }

  getListUserbByProgramSubject(programSubjectId: number) {
    this.userProgramService
      .getProgramsSubjectsByUser(programSubjectId)
      .subscribe({
        next: (response) => {
          // Handle the response, e.g., update the UI with the list of users
          this.list = response.users;
        },
        error: (error) => {
          // Handle any errors that occur during the request
          console.error('Error fetching users by program subject:', error);
        },
      });
  }

  viewUserDashboard(id: number) {
    this.router.navigate(['/private/users/dashboard', id]);
  }
}
