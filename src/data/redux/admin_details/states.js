import { getLocalAdminDetails } from '../../config/utils';

let oriAdminDetails = getLocalAdminDetails();

const states = {
    admin_details: {
        admin_id: oriAdminDetails && oriAdminDetails.admin_id ? oriAdminDetails.admin_id : null,
        token: oriAdminDetails && oriAdminDetails.token ? oriAdminDetails.token : null,
        user_info: oriAdminDetails && oriAdminDetails.user_info ? oriAdminDetails.user_info : null,
        loaders: {
            logging: false,
            login_success: false,
        }
    }
};

export default states;
