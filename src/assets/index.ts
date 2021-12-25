import {Image} from 'react-native';

const accountIcon = Image.resolveAssetSource(require('./images/_user.png'));

const rightArrowIcon = Image.resolveAssetSource(
  require('./images/right-arrow.png'),
);
const sendIcon = Image.resolveAssetSource(require('./images/send.png'));
export {accountIcon, rightArrowIcon, sendIcon};
