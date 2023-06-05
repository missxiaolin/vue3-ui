import { withInstallFunction } from '../../utils/with-install';
import FNotify from './src/notify';
export const Notification = withInstallFunction(FNotify, '$notify');
export default Notification;
