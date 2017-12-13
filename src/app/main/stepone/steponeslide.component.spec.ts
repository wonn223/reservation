import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteponeslideComponent } from './steponeslide.component';

describe('SteponeslideComponent', () => {
  let component: SteponeslideComponent;
  let fixture: ComponentFixture<SteponeslideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteponeslideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteponeslideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
