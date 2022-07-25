export class Delivery {
    constructor(
        public id?: number,
        public package_id?: number,
        public pickup_time?: Date,
        public start_time?: Date,
        public end_time?: Date,
        public location_lat?: number,
        public location_long?: number,
        public status?: string,
    ) {}
}