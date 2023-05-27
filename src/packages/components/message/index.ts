import { withInstallFunction } from '../../utils/with-install';
import FMessage from './src/messageMethod';

export const Message = withInstallFunction(FMessage, '$message');

export default Message;