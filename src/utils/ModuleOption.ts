import { Role, Channel, FullGuild, DiscordUser } from "./types"

type NewValue = string | number | boolean | Role[] | Channel[];
type OptionType = "string" | "number" | "boolean" | "channel" | "role" | "selectmenu";
type CurrentValueType = string | number | boolean | null

interface ModuleOptionOptions {
    title: string;
    description?: string;
    type: OptionType;
    getCurrentValue?: (user: DiscordUser, guild: FullGuild) => CurrentValueType;
    setNewValue: (user: DiscordUser, guild: FullGuild, value: NewValue) => "" | string;
    max_length?: number;
    min_length?: number;
    filter?: (user: DiscordUser, guild: FullGuild, value: NewValue) => "" | string;
    choices?: ModuleOptionChoice[]
}

interface ModuleOptionChoice {
    title: string;
    value: string;
}

interface ModuleOptionDataOptions {
    title: string;
    description?: string;
    type: OptionType;
    max_length?: number;
    min_length?: number;
    choices?: ModuleOptionChoice[]
}

export class ModuleOptionData {
    title: string;
    description?: string;
    type: OptionType;
    max_length?: number;
    min_length?: number;
    choices?: ModuleOptionChoice[]

    constructor(options: ModuleOptionDataOptions) {
        this.title = options.title;
        this.description = options.description;
        this.type = options.type;
        this.max_length = options.max_length;
        this.min_length = options.min_length;
        this.choices = options.choices;
    }
}

export class ModuleOption {
    title: string;
    description?: string;
    type: OptionType;
    getCurrentValue?: (user: DiscordUser, guild: FullGuild) => CurrentValueType;
    setNewValue: (user: DiscordUser, guild: FullGuild, value: NewValue) => "" | string;
    max_length?: number;
    min_length?: number;
    filter?: (user: DiscordUser, guild: FullGuild, value: NewValue) => "" | string;
    choices?: ModuleOptionChoice[]

    constructor(options: ModuleOptionOptions) {
        this.title = options.title;
        this.description = options.description;
        this.type = options.type;
        this.getCurrentValue = options.getCurrentValue;
        this.setNewValue = options.setNewValue;
        this.max_length = options.max_length;
        this.min_length = options.min_length;
        this.filter = options.filter;
        this.choices = options.choices;

        if (!["number", "channel", "role", "string", "selectmenu"].includes(this.type) && this.max_length) throw new Error("L'option max_length ne peux pas être utilisée avec le type " + this.type + ".");

        if (!["number", "channel", "role", "string", "selectmenu"].includes(this.type) && this.min_length) throw new Error("L'option min_length ne peux pas être utilisée avec le type " + this.type + ".");

        if (this.type !== "selectmenu" && this.choices) throw new Error("L'option choices ne peux pas être utilisée avec le type " + this.type + ".");

        if (this.description && (this.description.length < 15 || this.description.length > 200)) throw new Error("La description de l'option doit comporter entre 15 et 200 caractères.")
    }
}