import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksGalleryComponent } from './books-gallery.component';

describe('BooksGalleryComponent', () => {
  let component: BooksGalleryComponent;
  let fixture: ComponentFixture<BooksGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
