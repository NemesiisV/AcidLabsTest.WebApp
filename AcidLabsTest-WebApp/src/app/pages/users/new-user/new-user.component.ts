import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from '@app/models/user.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})

export class NewUserComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private _usersService : UsersService, 
    private router: Router,
    private _snackBar: MatSnackBar) {
    this.form = this.fromBuilder.group(
    {
      rut: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
    });
  }

  ngOnInit(): void {
  }

  addUser() {
    const user: UserModel = {
      id: "",
      firstName: this.form.value.firstName,
      rut: this.form.value.rut,
      lastName: this.form.value.lastName,
      email: this.form.value.email
    }

    this._usersService.postUser(user).subscribe(
      result => {
        this._snackBar.open('User added successfully', '', {
          duration:1500,
          horizontalPosition: 'center',
          verticalPosition:'bottom'
        });
        this.router.navigate(['/users']);
      },
      exception => {
        this._snackBar.open(exception.error, '', {
          duration:1500,
          horizontalPosition: 'center',
          verticalPosition:'bottom'
        });
      });
  }
}
