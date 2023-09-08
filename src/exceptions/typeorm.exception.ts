import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
    catch(exception: TypeORMError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        const message: string = (exception as TypeORMError).message;
       
        const customResponse: any = {
            status: 400,
            message,
            
        };

        response.status(customResponse.status).json(customResponse);
    }
}