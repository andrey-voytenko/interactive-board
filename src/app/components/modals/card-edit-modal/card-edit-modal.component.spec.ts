import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { CardEditModalComponent } from './card-edit-modal.component';

describe('CardEditModalComponent', () => {
	let component: CardEditModalComponent;
	let fixture: ComponentFixture<CardEditModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StoreModule.forRoot({})],
			declarations: [CardEditModalComponent],
			providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
		}).compileComponents();

		fixture = TestBed.createComponent(CardEditModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
