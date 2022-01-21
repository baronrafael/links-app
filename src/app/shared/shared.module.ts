import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { LinkCardComponent } from './components/link-card/link-card.component';

const COMPONENTS = [
  HeaderComponent,
  ProfileCardComponent,
  LinkCardComponent
];

const MODULES = [
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    ...MODULES
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS
  ]
})

export class SharedModule { }
