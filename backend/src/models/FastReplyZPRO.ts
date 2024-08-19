import {
    Model,
    Column,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Default,
    ForeignKey,
    BelongsTo,
    CreatedAt,
    UpdatedAt,
    Table
  } from 'sequelize-typescript';
  import TenantZPRO from './TenantZPRO';
  import UserZPRO from './UserZPRO';
  
  @Table({ freezeTableName: true })
  class FastReply extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;
  
    @AllowNull(false)
    @Column
    key!: string;
  
    @AllowNull(false)
    @Column
    message!: string;
  
    @AllowNull(true)
    @Default(null)
    @Column
    media!: string;
  
    @AllowNull(true)
    @Default(null)
    @Column
    voice!: string;
  
    @ForeignKey(() => UserZPRO)
    @Column
    userId!: number;
  
    @BelongsTo(() => UserZPRO)
    user!: UserZPRO;
  
    @ForeignKey(() => TenantZPRO)
    @Column
    tenantId!: number;
  
    @BelongsTo(() => TenantZPRO)
    tenant!: TenantZPRO;
  
    @CreatedAt
    @Column
    createdAt!: Date;
  
    @UpdatedAt
    @Column
    updatedAt!: Date;
  }
  
  export default FastReply;
  