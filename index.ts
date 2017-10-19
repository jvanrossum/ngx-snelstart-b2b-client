import { NgModule, Injector } from '@angular/core';
import { HttpModule } from '@angular/http';
import { B2bClientService } from './b2b-client.service';
import { B2bConfig } from './b2b-config.class';
import { ServiceLocatorService } from './service-locator.service';

@NgModule({
  imports: [HttpModule]
})
export class B2bClientModule {
  constructor(private injector: Injector) {
    ServiceLocatorService.injector = this.injector;
  }

  static forRoot() {
    return {
      ngModule: B2bClientModule,
      providers: [
        B2bClientService,
        { provide: B2bConfig, useValue: B2bConfig }
      ]
    }
  }
}
