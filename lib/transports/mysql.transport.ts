import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import {
    AuditData,
    MySQLTransportOptions,
    TransportMethods,
    Transport,
} from '../interfaces';
import { Logger } from '@nestjs/common';

export default class MySQLTransport implements Transport {
    options: MySQLTransportOptions;
    name = TransportMethods.MYSQL;

    // Define the Audit model
    private Audit: ModelCtor<Model<any, any>> | undefined;

    constructor(options: MySQLTransportOptions) {
        this.options = options;
        this.initializeDatabase();
    }

    private async initializeDatabase(): Promise<void> {
        // Instantiate sequelize with an URI
        const sequelize: Sequelize = new Sequelize(this.options.connectionString);

        // Create a Model
        this.Audit = sequelize.define('Audit', {
            userId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            action: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            objectId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            entity: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            outcome: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            error: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        });

        // Sync the model with the database
        await sequelize.sync();
    }

    async emit(data: AuditData): Promise<void> {
        try {
            await this.insertDocument(data);
        } catch (error) {
            Logger.error(
                'Error inserting into database. Please check if the provided connectionString is correct',
                error,
            );
        }
    }

    private async insertDocument(data: AuditData): Promise<void> {
        // Builds a new model instance and calls save on it.
        await this.Audit?.create({
            userId: data.userId,
            action: data.action,
            objectId: data.objectId,
            entity: data.entity,
            outcome: data.outcome,
            error: data.error,
            date: data.date,
        });
    }
}
