import { Group } from "src/groups/entities/group.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @ManyToMany(() => Group, (group: Group) => group.users)
    groups: Group[];
}
