/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MesaEscrutinioComponent } from './mesaEscrutinio.component';

describe('MesaEscrutinioComponent', () => {
  let component: MesaEscrutinioComponent;
  let fixture: ComponentFixture<MesaEscrutinioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesaEscrutinioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesaEscrutinioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
