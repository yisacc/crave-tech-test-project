import { InjectConnection } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from './database.constant';

export function DatabaseConnection(
    connectionName?: string
): (target: Record<string, any>, key: string | symbol, index?: number) => void {
    return InjectConnection(connectionName || DATABASE_CONNECTION_NAME);
}
