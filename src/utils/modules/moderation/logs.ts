import { ModuleOptionData, ModuleOption } from "@/utils/ModuleOption";

const Class = class Logs extends ModuleOption {
    constructor() {
        super({
            title: "Logs",
            description: "Logs",
            type: "boolean",
            setNewValue: (user, guild, value) => {
                return "";
            }
        });
    }
}


/*
    Merci de ne pas modifier les lignes qui suivent.
 */
const data = class LogsData extends ModuleOptionData {
    constructor() {
        super({
            title: new Class().title,
            description: new Class().description,
            type: new Class().type,
            max_length: new Class().max_length,
            min_length: new Class().min_length,
            choices: new Class().choices
        });
    }
}

export { Class, data };