import { CadastrarPjComponent } from './components/cadastrar-pj/cadastrar-pj.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroPjComponent } from './components/cadastro-pj.component';

const routes: Routes = [
  {
    path: 'cadastro-pj',
    component: CadastroPjComponent,
    children: [
      {
        path: '', component: CadastrarPjComponent
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroPjRoutingModule { }
