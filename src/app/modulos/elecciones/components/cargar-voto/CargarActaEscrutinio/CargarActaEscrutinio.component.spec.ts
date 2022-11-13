/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CargarActaEscrutinioComponent } from './CargarActaEscrutinio.component';

describe('CargarActaEscrutinioComponent', () => {
  let component: CargarActaEscrutinioComponent;
  let fixture: ComponentFixture<CargarActaEscrutinioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarActaEscrutinioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarActaEscrutinioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
