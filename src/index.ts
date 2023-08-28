/**
 * Aplenture/<my_module_name>
 * https://github.com/Aplenture/<my_module_name>
 * Copyright (c) 2023 Aplenture
 * License https://github.com/Aplenture/<my_module_name>/blob/main/LICENSE
 */

import * as BackendJS from "backendjs";
import * as CoreJS from "corejs";
import { Args, Options, Context } from "./core";
import { MyRepository } from "./repositories";

export class Module extends BackendJS.Module.Module<Context, Args, Options> implements Context {
    public readonly allowedRequestHeaders: readonly string[] = [];

    public readonly database: BackendJS.Database.Database;
    public readonly myRepository: MyRepository;

    constructor(args: BackendJS.Module.Args, options: Options, ...params: CoreJS.Parameter<any>[]) {
        super(args, options, ...params, new CoreJS.DictionaryParameter('database', 'database config', BackendJS.Database.Parameters));

        this.database = new BackendJS.Database.Database(this.options.database, args.debug);
        this.database.onMessage.on(message => this.onMessage.emit(this, `database '${this.options.database.database}' ${message}`));

        this.myRepository = new MyRepository(this.database);

        this.addCommands(Object.values(require('./commands')).map((constructor: any) => new constructor(this)));
    }

    public async init(): Promise<void> {
        await BackendJS.Database.Database.create(this.options.database);
        await this.database.init();
        await super.init();
    }

    public async deinit(): Promise<void> {
        await this.database.close();
        await super.deinit();
    }
}