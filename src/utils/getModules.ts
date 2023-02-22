import {readdirSync} from "fs";
import {Class} from "@/utils/modules/moderation/logs";

export function getModules () {
    let folders = readdirSync("./src/utils/modules");

    if (folders.includes("README.md")) folders.splice(folders.indexOf("README.md"), 1);

    let modules = [];

    for (const folder of folders) {
        const module = readdirSync("./src/utils/modules/" + folder);

        if (!module) return;

        const infoFile = module.find(file => file === "infos.json");

        if (!infoFile) return;

        module.splice(module.indexOf("infos.json"), 1);

        const infos = require(`@/utils/modules/${folder}/infos.json`);

        if (!infos) return;

        const checkedInfoFile = checkInfoFile(infos);

        if (checkedInfoFile !== "") throw new Error(checkedInfoFile);

        const options = [];

        for (const file of module) {
            if (!file.endsWith(".ts")) return;

            const optionData = require("@/utils/modules/" + folder + "/" + file);

            if (!optionData) return;

            const option = {
                title: optionData.data.title || null,
                description: optionData.data.description || null,
                type: optionData.data.type || null,
                max_length: optionData.data.max_length || null,
                min_length: optionData.data.min_length || null,
                choices: optionData.data.choices || null,
                name: file.replace(".ts", "")
            };

            if (!option) throw new Error("L'option " + file + " n'a pas de données. Nous vous rappelons, que la deuxième classe du fichier ne doit pas être modifiée. Elle est automatiquement générée en fonction de la première.");

            options.push(option);
        }

        modules.push({
            name: folder || null,
            title: infos.title || null,
            description: infos.description || null,
            options: options || null
        });
    }

    if (modules.length === 0) throw new Error("Aucun module n'a été trouvé.");

    return modules;
}

function checkInfoFile (data: { title: string, description: string }): "" | string {
    const { title, description } = data;

    if (!title) return "Aucun titre enregistré dans dans le fichier infos.json";
    if (!description) return "Aucune description enregistrée dans le fichier infos.json";

    if (description.length > 100) return "La description ne doit pas dépasser 100 caractères";
    if (description.length < 15) return "La description doit comporter au moins 15 caractères";

    return ""
}