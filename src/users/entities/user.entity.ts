import { Group } from "src/groups/entities/group.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;

    @ManyToMany(() => Group, (group: Group) => group.users)
    groups: Group[];
}
