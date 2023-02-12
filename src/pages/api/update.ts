import {NextApiRequest, NextApiResponse} from "next";
import updateBotInfos from "@/utils/updateBotInfos";

export default async function update(req: NextApiRequest, res: NextApiResponse) {
    await updateBotInfos()

    res.status(200).json({status: "Informations mises à jour !"})
}