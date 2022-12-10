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

@NgModule({
	declarations: [
		AppComponent,
		BoardComponent,
		ControlPanelComponent,
		CardComponent,
		TruncatePipe,
  CardMenuComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		StoreModule.forRoot({}, {}),
		NgbModule,
		BrowserAnimationsModule,
		DragDropModule,
		MatMenuModule,
		MatIconModule,
		MatTooltipModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
