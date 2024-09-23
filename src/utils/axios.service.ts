import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AxiosService {

    constructor(
        private readonly logger: Logger,
    ) {
    }

    async get(url: string, config = {}): Promise<any> {
        try {
            const response = await axios.get(url, config);
            return response.data;
        } catch (error) {
            this.logger.error('Error sending GET request:', error);
            throw new Error(`Error sending GET request: ${error.message}`);
        }
    }

    async post(url: string, data: any, config = {}): Promise<any> {
        try {
            const response = await axios.post(url, data, config);
            return response.data;
        } catch (error) {
            this.logger.error(`Error sending POST request: ${JSON.stringify(error)}`, error);
            throw new Error(`Error sending POST request: ${error.message}`);
        }
    }
}
