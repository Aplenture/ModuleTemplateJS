import * as BackendJS from "backendjs";

interface LoadUpdatesOptions {
    readonly versions?: readonly number[];
    readonly minVersion?: number;
    readonly maxVersion?: number;
}

export function loadUpdates(options: LoadUpdatesOptions = {}): BackendJS.Database.Update[] {
    const dict: NodeJS.ReadOnlyDict<BackendJS.Database.Update> = require('../updates');

    return Object.values(dict).filter(update => {
        if (options.versions && !options.versions.includes(update.version))
            return false;

        if (undefined != options.minVersion && update.version < options.minVersion)
            return false;

        if (undefined != options.maxVersion && update.version > options.maxVersion)
            return false;

        return true;
    });
}