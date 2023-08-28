/**
 * Aplenture/<my_module_name>
 * https://github.com/Aplenture/<my_module_name>
 * Copyright (c) 2023 Aplenture
 * License https://github.com/Aplenture/<my_module_name>/blob/main/LICENSE
 */

import * as BackendJS from "backendjs";

export interface Options extends BackendJS.Module.Options {
    readonly database: BackendJS.Database.Config;
}