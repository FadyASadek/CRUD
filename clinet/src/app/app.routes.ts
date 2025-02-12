import { Routes } from '@angular/router';
import { StudentsComponent } from './components/students/students.component';
import { StudentFormComponent } from './components/students/student-form/student-form.component';

export const routes: Routes = [
  {
    path: 'students',
    component: StudentsComponent,
  },
  {
    path: 'studentsForm/:id',
    component: StudentFormComponent,
  },
  {
    path: 'studentsForm',
    component: StudentFormComponent,
  },
];
