import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from '@app/models/user.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})

export class UpdateUserComponent implements OnInit {
  form: FormGroup;
  constructor(
    private activeRoute: ActivatedRoute,
    private fromBuilder: FormBuilder,
    private _usersService : UsersService, 
    private router: Router,
    private _snackBar: MatSnackBar) {
    this.userId = this.activeRoute.snapshot.paramMap.get('id') as string;
    this.form = this.fromBuilder.group(
    {
      rut: "",
      firstName: "",
      lastName: "",
      email: "",
    });
  }

  public userId: string;
  public currentUser: UserModel = new UserModel();

  ngOnInit(): void {
    if (this.userId) {
      this._usersService.getUser(this.userId).subscribe(
        result => {
          this.currentUser = result;
        },
        exception => {
          this._snackBar.open(exception.error, '', {
            duration:1500,
            horizontalPosition: 'center',
            verticalPosition:'bottom'
          });
        }
      );
    }
  }

  updateUser() {
    const user: UserModel = {
      id: this.userId,
      firstName: this.form.value.firstName,
      rut: this.form.value.rut,
      lastName: this.form.value.lastName,
      email: this.form.value.email
    };

    this._usersService.putUser(user).subscribe(
      result => {
        this._snackBar.open('User updated successfully', '', {
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
      }
    );
  }
}
