import { InjectionToken } from "@angular/core";
import { AppConfig } from "./appconfig.interface";
import { env } from "../environment/environment";

// 'env' is called inside this service containing two constants and APP_CONFIG will contain the api endpoint from the environment api endpoint we defined.
// Interface was created as InjectionToken expects an interface which can be used to inject the values present inside that interface into other services from this const defined here.
export const APP_SERVICE_CONF = new InjectionToken<AppConfig>('app.config');

export const APP_CONFIG: AppConfig = {
    apiEndpoint: env.apiEndpoint
}