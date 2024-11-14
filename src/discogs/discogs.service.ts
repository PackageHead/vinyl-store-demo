import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscogsService {
  private apiUrl = 'https://api.discogs.com';

  constructor(private readonly configService: ConfigService) {}

  async getVinylById(vinylId: string) {
    const apiKey = this.configService.get<string>('DISCOGS_API_KEY');
    const response = await axios.get(`${this.apiUrl}/records/${vinylId}`, {
      headers: { Authorization: `Discogs key ${apiKey}` },
    });
    return response.data;
  }
}
