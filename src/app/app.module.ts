import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { StoreModule } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CardComponent } from './components/card/card.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TruncatePipe } from './pipes/truncate';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardMenuComponent } from './components/card-menu/card-menu.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { metaReducers, reducers } from './store';
import { CardEditModalComponent } from './components/modals/card-edit-modal/card-edit-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { DialogEffects } from './store/effects/dialog.effects';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiModule, APIS } from './backend-services/index';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
	declarations: [
		AppComponent,
		BoardComponent,
		ControlPanelComponent,
		CardComponent,
		TruncatePipe,
		CardMenuComponent,
		CardEditModalComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		StoreModule.forRoot(reducers, {
			metaReducers,
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: false,
			},
		}),
		NgbModule,
		BrowserAnimationsModule,
		DragDropModule,
		MatMenuModule,
		MatIconModule,
		MatTooltipModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatButtonModule,
		EffectsModule.forRoot([DialogEffects]),
		HttpClientModule,
		ApiModule,
	],
	providers: [APIS],
	bootstrap: [AppComponent],
	entryComponents: [CardEditModalComponent],
})
export class AppModule {}
