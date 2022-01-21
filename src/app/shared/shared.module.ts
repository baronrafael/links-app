import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';

const COMPONENTS = [
  HeaderComponent
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
