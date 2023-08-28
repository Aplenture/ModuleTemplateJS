/**
 * Aplenture/<my_module_name>
 * https://github.com/Aplenture/<my_module_name>
 * Copyright (c) 2023 Aplenture
 * License https://github.com/Aplenture/<my_module_name>/blob/main/LICENSE
 */

import * as BackendJS from "backendjs";

export const MyUpdate: BackendJS.Database.Update = {
    name: "MyUpdate",
    version: 100,
    timestamp: '2023-08-26',
    update: `CREATE TABLE IF NOT EXISTS \`myTable\` (
        \`id\` BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        \`created\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`name\` TEXT NULL
    ) DEFAULT CHARSET=utf8`,
    reset: `TRUNCATE TABLE \`myTable\``,
    revert: `DROP TABLE IF EXISTS \`myTable\``
}