export interface IType {
    id: number;
    type_name: string;
    abbr: string;
    active: boolean;
    type_code_id: number;
    created_by: string;
    updated_by: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    description: string;
}