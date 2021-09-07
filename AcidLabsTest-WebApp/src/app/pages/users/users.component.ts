import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface User {
  firstName: string;
  rut: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users : User[] = [];
  displayedColumns: string[] = ['rut', 'firstName', 'lastName', 'email', 'actions'];
  dataSource! : MatTableDataSource<any>; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _userService: UsersService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers()
  {
    this.users = this._userService.getUsers();
    this.dataSource = new MatTableDataSource(this.users);
  }

  deleteUser(index : number){
    this._userService.deleteUser(index);
    this.loadUsers();

    this._snackBar.open('User deleted successfully', '', {
      duration:1500,
      horizontalPosition: 'center',
      verticalPosition:'bottom'
    });
  }

  ngAfterViewInit()
  {
    this.dataSource.paginator = this.paginator;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
