export interface Bike {
  bikes: BikeItem[];
}

export interface BikeItem {
  date_stolen: any;
  description: any;
  frame_colors: string[];
  frame_model: any;
  id: number;
  is_stock_img: boolean;
  large_img: any;
  location_found: any;
  manufacturer_name: string;
  external_id: any;
  registry_name: any;
  registry_url: any;
  serial: string;
  status: string;
  stolen: boolean;
  stolen_coordinates: any;
  stolen_location: any;
  thumb: any;
  title: string;
  url: string;
  year: any;
  propulsion_type_slug: string;
  cycle_type_slug: string;
  registration_created_at: number;
  registration_updated_at: number;
  api_url: string;
  manufacturer_id: number;
  paint_description: any;
  name: any;
  frame_size: string;
  rear_tire_narrow: boolean;
  front_tire_narrow: boolean;
  type_of_cycle: string;
  test_bike: boolean;
  rear_wheel_size_iso_bsd: number;
  front_wheel_size_iso_bsd: number;
  handlebar_type_slug: any;
  frame_material_slug: any;
  front_gear_type_slug: any;
  rear_gear_type_slug: any;
  extra_registration_number: any;
  additional_registration: any;
  stolen_record: any;
  public_images: any[];
  components: any[];
}

export interface BikeItemOne {
  bike: BikeItem;
}

export interface BikesCount {
  non: number;
  stolen: number;
  proximity: number;
}
