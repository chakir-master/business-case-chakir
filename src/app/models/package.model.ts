export class Package {
    constructor(
        public active_delivery_id?: { type?: String },
        public description?: string,
        public weight?: number,
        public width?: number,
        public height?: number,
        public depth?: number,
        public from_name?: string,
        public from_address?: string,
        public from_location_long?: number,
        public from_location_lat?: number,
        public to_name?: string,
        public to_address?: string,
        public to_location_long?: number,
        public to_location_lat?: number,
    ) {}
}