import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '@app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '@app/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
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

}
