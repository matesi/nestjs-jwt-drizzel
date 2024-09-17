import { Get, Injectable } from "@nestjs/common";

@Injectable()
export class ClientsService {
    @Get('get-clients')
    async getClients(): Promise<any> {
        return 'Chegou aqui!';
    }
}