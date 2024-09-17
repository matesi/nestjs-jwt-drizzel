import { Injectable } from "@nestjs/common";

@Injectable()
export class ClientsService {
    constructor() {
        console.log('Chegou aqui no constructor Service!');
    }

    async getClients(): Promise<string> {
        return 'Chegou aqui no Service!';
    }
}