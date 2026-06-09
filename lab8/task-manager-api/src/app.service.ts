import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string { return 'Task Manager API v2 — with PostgreSQL'; }
}
