
import { TC } from './../sidebar/tc.model';

export class Market {
    Market_ID: number;
    Market_Name_e: string;
    Market_Name_c: string;
    Region_e: string;
    Region_c: string;
    District_e: string;
    District_c: string;
    Address_e: string;
    Address_c: string;
    Bussiness_Hour_e: string;
    Bussiness_Hour_c: string;
    Coordinate: string;
    Contact_1: string;
    Contact_2: string;
    Tenancy_Commodity: TC[];

    constructor(Market_ID: number, Market_Name_e: string, Market_Name_c: string
        , Region_e: string, Region_c: string, District_e: string
        , District_c: string, Address_e: string, Address_c: string
        , Bussiness_Hour_e: string, Bussiness_Hour_c: string, Coordinate: string
        , Contact_1: string, Contact_2: string, Tenancy_Commodity: TC[]) {
        this.Market_ID = Market_ID;
        this.Market_Name_e = Market_Name_e;
        this.Market_Name_c = Market_Name_c;
        this.Region_e = Region_e;
        this.Region_c = Region_c;
        this.District_e = District_e;
        this.District_c = District_c;
        this.Address_e = Address_e;
        this.Address_c = Address_c;
        this.Bussiness_Hour_e = Bussiness_Hour_e;
        this.Bussiness_Hour_c = Bussiness_Hour_c;
        this.Coordinate = Coordinate;
        this.Contact_1 = Contact_1;
        this.Contact_2 = Contact_2;
        this.Tenancy_Commodity = Tenancy_Commodity;
    }

}
