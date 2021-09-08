import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  { 
    path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  { 
    path: 'notFound', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  },
  { 
    path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) 
  }, 
  { 
    path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) 
  }, 
  { 
    path: 'new-user', loadChildren: () => import('./pages/users/new-user/new-user.module').then(m => m.NewUserModule) 
  }, 
  { 
    path: 'update-user/:id', loadChildren: () => import('./pages/users/update-user/update-user.module').then(m => m.UpdateUserModule) 
  }, 
  { 
    path: 'user/:id', loadChildren: () => import('./pages/users/user/user.module').then(m => m.UserModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
