
export interface DealDetails {
    id: number;
    creator_user_id: CreatorUserId;
    user_id: UserId;
    person_id: PersonId;
    org_id: OrgId;
    stage_id: number;
    title: string;
    value: number;
    currency: string;
    add_time: string;
    update_time: string;
    stage_change_time: string;
    active: boolean;
    deleted: boolean;
    status: string;
    probability?: any;
    next_activity_date?: any;
    next_activity_time?: any;
    next_activity_id?: any;
    last_activity_id: number;
    last_activity_date: string; 
    lost_reason?: any;
    visible_to: string;
    close_time?: any;
    pipeline_id: number;
    won_time?: any;
    first_won_time?: any;
    lost_time?: any;
    products_count: number;
    files_count: number;
    notes_count: number;
    followers_count: number;
    email_messages_count: number;
    activities_count: number;
    done_activities_count: number;
    undone_activities_count: number;
    participants_count: number;
    expected_close_date: string;
    last_incoming_mail_time: string;
    last_outgoing_mail_time: string;
    label?: any;
    property_type?: any;
    bedrooms_count?: any;
    lead_source?: any;
    renewal_type: string;
    stage_order_nr: number;
    person_name: string;
    org_name: string;
    next_activity_subject?: any;
    next_activity_type?: any;
    next_activity_duration?: any;
    next_activity_note?: any;
    group_id?: any;
    group_name?: any;
    formatted_value: string;
    weighted_value: number;
    formatted_weighted_value: string;
    weighted_value_currency: string;
    rotten_time?: any;
    owner_name: string;
    cc_email: string;
    org_hidden: boolean;
    person_hidden: boolean;
    average_time_to_won: AverageTimeToWon;
    average_stage_progress: number;
    age: Age;
    stay_in_pipeline_stages: StayInPipelineStages;
}

export class CreatorUserId {
    id!: number;
    name!: string;
    email!: string;
    has_pic!: number;
    pic_hash?: any;
    active_flag!: boolean;
    value!: number;
}

export class UserId {
    id!: number;
    name!: string;
    email!: string;
    has_pic!: number;
    pic_hash?: any;
    active_flag!: boolean;
    value!: number;
}

export class Email {
    value!: string;
    primary!: boolean;
}

export class Phone {
    value!: string;
    primary!: boolean;
}

export class PersonId {
    active_flag!: boolean;
    name!: string;
    email!: Email[];
    phone!: Phone[];
    value!: number;
}

export class OrgId {
    name!: string;
    people_count!: number;
    owner_id!: number;
    address!: string;
    active_flag!: boolean;
    cc_email!: string;
    value!: number;
}

export class AverageTimeToWon {
    y!: number;
    m!: number;
    d!: number;
    h!: number;
    i!: number;
    s!: number;
    total_seconds!: number;
}

export class Age {
    y!: number;
    m!: number;
    d!: number;
    h!: number;
    i!: number;
    s!: number;
    total_seconds!: number;
}

export class TimesInStages {
    _47!: number;
}

export class StayInPipelineStages {
    times_in_stages!: TimesInStages;
    order_of_stages!: number[];
}


export interface dealDetails {
    success: boolean;
    data: DealDetails;
}
