import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from '@app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users : UserModel[] = [];
  displayedColumns: string[] = ['rut', 'firstName', 'lastName', 'email', 'actions'];
  dataSource! : MatTableDataSource<any>; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _usersService: UsersService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers()
  {
    this._usersService.getUsers().subscribe(result=> {
      console.log(result);
      this.users = result;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteUser(id : string){
    this._usersService.deleteUser(id).subscribe(
      result => {
        this._snackBar.open('User deleted successfully', '', {
          duration:1500,
          horizontalPosition: 'center',
          verticalPosition:'bottom'
        });
        this.getUsers();
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
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
