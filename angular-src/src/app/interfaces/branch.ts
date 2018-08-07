export interface IBranch {
    id: number;
    branch_name: string;
    abbr: string;
    phone: string;
    fax: string;
    email: string;
    website: string;
    branch_manager: string;
    active: boolean;
    created_by: string;
    update_by: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    primary_color: string;
    secondary_color: string;
}