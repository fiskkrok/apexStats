import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import axios from 'axios';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const platform: string = req.query.platform;
    const playerId: string = req.query.playerId;

    if (!platform || !playerId) {
        context.res = {
            status: 400,
            body: "Please provide both platform and playerId"
        };
        return;
    }

    try {
        const response = await axios.get(`https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${playerId}`, {
            headers: {
                'TRN-Api-Key': process.env.API_KEY
            }
        });

        context.res = {
            body: response.data
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: "Error occurred"
        };
    }
};

export default httpTrigger;
