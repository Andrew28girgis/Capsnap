 
    export interface Datum2 {
        id: number;
        order_nr: number;
        name: string;
        active_flag: boolean;
        deal_probability: number;
        pipeline_id: number;
        rotten_flag: boolean;
        rotten_days?: any;
        add_time: string;
        update_time: string;
        pipeline_name: string;
        pipeline_deal_probability: boolean;
    }

    export interface Stages {
        success: boolean;
        data: Datum2[];
    }

    export interface Pipeline {
        id: number;
        name: string;
        url_title: string;
        order_nr: number;
        active: boolean;
        deal_probability: boolean;
        add_time: string;
        update_time: string;
        selected: boolean;
        stages: Stages;
    }

    export interface Pagination {
        start: number;
        limit: number;
        more_items_in_collection: boolean;
    }

    export interface AdditionalData {
        pagination: Pagination;
    }

    export interface RootObjectPipelines {
        success: boolean;
        data: Pipeline[];
        additional_data: AdditionalData;
    }
 