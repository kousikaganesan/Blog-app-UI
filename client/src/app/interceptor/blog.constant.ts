import { InjectionToken } from "@angular/core";
import { BlogInterface } from "./blog.interface";

export const BLOG_CONFIG: BlogInterface = {

    OK: 200,
    DOMAIN: 'http://localhost:3000',
    ERROR : 500

};

export let OK = new InjectionToken<BlogInterface>('app.config');
export let DOMAIN = new InjectionToken<BlogInterface>('app.config');
export let ERROR = new InjectionToken<BlogInterface>('app.config');