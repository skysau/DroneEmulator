import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { DroneSimulatorComponent } from './drone-simulator/drone-simulator.component';

@NgModule({
  declarations: [
    AppComponent,
    DroneSimulatorComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
