/**
 * Aplenture/<my_module_name>
 * https://github.com/Aplenture/<my_module_name>
 * Copyright (c) 2023 Aplenture
 * MIT License https://github.com/Aplenture/<my_module_name>/blob/main/LICENSE
 */

import * as BackendJS from "backendjs";
import * as CoreJS from "corejs";
import { Args, Options, Context } from "./core";
import { MyRepository } from "./repositories";

export class Module extends BackendJS.Module.Module<Context, Args, Options> implements Context {
    public readonly allowedRequestHeaders: readonly string[] = [];

    public readonly database: BackendJS.Database.Database;
    public readonly myRepository: MyRepository;

    constructor(app: BackendJS.Module.IApp, args: BackendJS.Module.Args, options: Options, ...params: CoreJS.Parameter<any>[]) {
        super(app, args, options, ...params,
            new CoreJS.DictionaryParameter('databaseConfig', 'database config', BackendJS.Database.Parameters),
            new CoreJS.StringParameter('databaseTable', 'database table name', 'myDatabaseTable')
        );

        this.database = new BackendJS.Database.Database(this.options.databaseConfig, {
            debug: args.debug,
            multipleStatements: true
        }, app);

        this.myRepository = new MyRepository(this.options.databaseTable, this.database, __dirname + '/updates/' + MyRepository.name);

        this.addCommands(Object.values(require('./commands')).map((constructor: any) => new constructor(this)));
    }

    public async init(): Promise<void> {
        await BackendJS.Database.Database.create(this.options.databaseConfig);
        await this.database.init();
        await super.init();
    }

    public async deinit(): Promise<void> {
        await this.database.close();
        await super.deinit();
    }
}