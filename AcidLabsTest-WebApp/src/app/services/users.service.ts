import { Injectable } from '@angular/core';
import { User } from '@app/pages/users/users.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [
    {rut: '1', firstName: 'Hydrogen', lastName: '6.941', email: 'H'},
    {rut: '1', firstName: 'Hydrogen', lastName: '6.941', email: 'H'},
    {rut: '1', firstName: 'Hydrogen', lastName: '6.941', email: 'H'},
    {rut: '1', firstName: 'Hydrogen', lastName: '6.941', email: 'H'},
    {rut: '1', firstName: 'Hydrogen', lastName: '6.941', email: 'H'},
    {rut: '1', firstName: 'Hydrogen', lastName: '6.941', email: 'H'},
    {rut: '1', firstName: 'Hydrogen', lastName: '6.941', email: 'H'},
    {rut: '1', firstName: 'Hydrogen', lastName: '6.941', email: 'H'},
    {rut: '1', firstName: 'Hydrogen', lastName: '6.941', email: 'H'},
    {rut: '1', firstName: 'Hydrogen', lastName: '6.941', email: 'H'},
  ];

  constructor() { }

  getUsers()
  {
    return this.users.slice();
  }

  deleteUser(index: number){
    this.users.splice(index, 1)
  }

  addUser(user: User){
    this.users.unshift(user);
  }

  updateUser(user: User)
  {
    this.users.map(function(userItem){
      if (userItem.email == user.email)
      {
        userItem = user
      }

      return userItem;
    });
  }
}
