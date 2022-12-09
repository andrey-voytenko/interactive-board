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

@NgModule({
	declarations: [AppComponent, BoardComponent, ControlPanelComponent, CardComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		StoreModule.forRoot({}, {}),
		NgbModule,
		BrowserAnimationsModule,
		DragDropModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
