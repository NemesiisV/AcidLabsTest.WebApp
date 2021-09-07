import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../users.component';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  form: FormGroup;
  isDisable: boolean = true;

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
      email: ["franciscaf.diazg@gmail.com", Validators.required],
    });
  }

  ngOnInit(): void {
  }

  updateUser() {
    const user: User = {
      firstName: this.form.value.firstName,
      rut: this.form.value.rut,
      lastName: this.form.value.lastName,
      email: this.form.value.email
    }
    
    this._usersService.addUser(user);
    this.router.navigate(['/users']);

    this._snackBar.open('User added successfully', '', {
      duration:1500,
      horizontalPosition: 'center',
      verticalPosition:'bottom'
    });
  }

  loadUser()
  {

  }

}
