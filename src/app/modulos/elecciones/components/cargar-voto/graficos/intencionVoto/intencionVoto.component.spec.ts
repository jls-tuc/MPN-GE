/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IntencionVotoComponent } from './intencionVoto.component';

describe('IntencionVotoComponent', () => {
  let component: IntencionVotoComponent;
  let fixture: ComponentFixture<IntencionVotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntencionVotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntencionVotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
