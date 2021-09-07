import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '@app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  form: FormGroup;
  isDisable: boolean = true;

  constructor(
    private fromBuilder: FormBuilder,
    private _usersService : UsersService, 
    private router: Router,
    private _snackBar: MatSnackBar) {
    this.form = this.fromBuilder.group(
    {
      rut: ["18.950.492-6"],
      firstName: ["Francisca"],
      lastName: ["Díaz"],
      email: ["franciscaf.diazg@gmail.com"],
    });
  }

  ngOnInit(): void {
  }

}
