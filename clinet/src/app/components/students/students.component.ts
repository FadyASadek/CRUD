import { Component, inject, OnInit } from '@angular/core';
import { Students } from '../../types/students';
import { StudentsService } from '../../services/students.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  studentService = inject(StudentsService);
  student$!: Observable<Students[]>;
  // تم تغيير هذه السطر:
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  delete(id: number) {
    console.log(id);
    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.getStudents();
        this.toastr.success('Successfully Deleted'); // استخدم `this.toastr` هنا
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error Deleting Student'); // إضافة رسالة خطأ في حالة حدوث خطأ
      },
    });
  }

  private getStudents(): void {
    this.student$ = this.studentService.getStudent();
  }
}
