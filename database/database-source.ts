import { DataSource, DataSourceOptions } from 'typeorm'
export const AppDataSource:DataSourceOptions={
    type: 'mysql',
    host: 'localhost',
    database: 'bibliotheque',
    username: 'root',
    password: 'Rodolph4904@',
    synchronize: true,
    logging: false,
    entities: ["dist/**/*.entity{.ts,.js}"],
}
const databaseSource = new DataSource(AppDataSource);
databaseSource.initialize();
export default databaseSource;