import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentsService } from '../../../services/students.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit, OnDestroy {
  studentService = inject(StudentsService);
  studentSub!: Subscription;
  router = inject(Router);
  form!: FormGroup;
  paramSup!: Subscription;
  isEdit = false;
  id = 0;
  toster = inject(ToastrService);  // هنا تم استخدام inject بشكل صحيح

  constructor(private fo: FormBuilder, private routerActivate: ActivatedRoute) {}

  ngOnDestroy(): void {
    if (this.studentSub) {
      this.studentSub.unsubscribe();
    }
    if (this.paramSup) {
      this.paramSup.unsubscribe();
    }
  }

  onsubmit() {
    this.form.markAllAsTouched();
    if (!this.isEdit) {
      this.studentSub = this.studentService.addStudent(this.form.value).subscribe({
        next: (res) => {
          this.router.navigateByUrl('/students');
          this.toster.success('Successfully Add Student'); // هنا يتم عرض الرسالة
        },
        error: (err) => {
          return err;
        }
      });
    } else {
      this.studentService.editStudent(this.id, this.form.value).subscribe({
        next: () => {
          this.router.navigateByUrl('/students');
          this.toster.success('Successfully Edit Student'); // هنا يتم عرض الرسالة

        },
        error: () => {}
      });
    }
  }

  ngOnInit(): void {
    this.paramSup = this.routerActivate.params.subscribe({
      next: (res) => {
        let id = res['id'];
        this.id = id;
        if (!id) {
          return;
        }
        this.studentService.oneStudent(id).subscribe({
          next: (value) => {
            this.form.patchValue(value);
            this.isEdit = true;
          },
          error: (error) => {
            console.log(error);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.form = this.fo.group({
      name: ['', Validators.required],
      address: [],
      phoneNumber: [],
      email: ['', Validators.email]
    });
  }
}
