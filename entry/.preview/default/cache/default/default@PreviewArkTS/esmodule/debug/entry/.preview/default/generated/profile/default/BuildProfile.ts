/**
 * Use these variables when you tailor your ArkTS code. They must be of the const type.
 */
export const BUNDLE_NAME = 'com.eatapp.recipe';
export const BUNDLE_TYPE = 'app';
export const VERSION_CODE = 1000000;
export const VERSION_NAME = '1.0.0';
export const TARGET_NAME = 'default';
export const PRODUCT_NAME = 'default';
export const BUILD_MODE_NAME = 'debug';
export const DEBUG = true;
export const API_BASE_URL = 'http://192.168.2.112:8080/api/app/v1';
export const SHARE_BASE_URL = 'https://dev-h5.example.com/recipe/';
export const APP_VERSION = '1.0.0';
export const ENV = 'dev';
export const LOG_ENABLED = true;
/**
 * BuildProfile Class is used only for compatibility purposes.
 */
export default class BuildProfile {
    static readonly BUNDLE_NAME = BUNDLE_NAME;
    static readonly BUNDLE_TYPE = BUNDLE_TYPE;
    static readonly VERSION_CODE = VERSION_CODE;
    static readonly VERSION_NAME = VERSION_NAME;
    static readonly TARGET_NAME = TARGET_NAME;
    static readonly PRODUCT_NAME = PRODUCT_NAME;
    static readonly BUILD_MODE_NAME = BUILD_MODE_NAME;
    static readonly DEBUG = DEBUG;
    static readonly API_BASE_URL = API_BASE_URL;
    static readonly SHARE_BASE_URL = SHARE_BASE_URL;
    static readonly APP_VERSION = APP_VERSION;
    static readonly ENV = ENV;
    static readonly LOG_ENABLED = LOG_ENABLED;
}
