import { UserTaskCollection } from '../../tasks/shared/user-task.collection';

export class UserModel {
    id: string;
    username: string;
    password: string;
    createdAt: number;
    tasks: UserTaskCollection = new UserTaskCollection();
}