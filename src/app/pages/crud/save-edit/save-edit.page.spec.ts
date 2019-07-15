import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEditPage } from './save-edit.page';

describe('SaveEditPage', () => {
  let component: SaveEditPage;
  let fixture: ComponentFixture<SaveEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
