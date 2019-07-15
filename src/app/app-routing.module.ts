import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', redirectTo: 'login' },
  { path: 'login', redirectTo: 'login' },


  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'aluno', loadChildren: './pages/aluno/aluno.module#AlunoPageModule' },
  { path: 'personal', loadChildren: './pages/personal/personal.module#PersonalPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'lista', loadChildren: './pages/lista/lista.module#ListaPageModule' },
  { path: 'save-edit', loadChildren: './pages/crud/save-edit/save-edit.module#SaveEditPageModule' },
  { path: 'delete', loadChildren: './pages/crud/delete/delete.module#DeletePageModule' },
  { path: 'list', loadChildren: './pages/crud/list/list.module#ListPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
