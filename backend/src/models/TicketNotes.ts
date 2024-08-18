import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    Default,
} from 'sequelize-typescript';
import Tenant from './Tenant';
import User from './User';

@Table
class TicketNotes extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    notes!: string;

    @AllowNull(false)
    @Column
    ticketId!: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => Tenant)
    @AllowNull(false)
    @Column
    tenantId!: number;

    @BelongsTo(() => Tenant)
    tenant!: Tenant;

    @Default(null)
    @AllowNull(true)
    @Column(DataType.JSON)
    medias!: string[]; // Adicionando campo de mídias

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

export default TicketNotes;
