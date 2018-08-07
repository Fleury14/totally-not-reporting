export interface IEmployee {
    id: number;
    first_name: string;
    last_name: string;
    initials: string;
    courtesy_title: string;
    title: string;
    active: boolean;
    department_id: string;
    branch_id: string;
    updated_by: string;
    created_at: Date;
    deleted_at: Date;
    picture_guid: string;
}