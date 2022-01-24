import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { HeaderComponent } from './components/header/header.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { LinkCardComponent } from './components/link-card/link-card.component';
import { AddLinkCardComponent } from './components/add-link-card/add-link-card.component';

const COMPONENTS = [
  HeaderComponent,
  ProfileCardComponent,
  AddLinkCardComponent,
  LinkCardComponent
];

const MODULES = [
  FormsModule,
  ReactiveFormsModule,
  TranslocoModule
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
