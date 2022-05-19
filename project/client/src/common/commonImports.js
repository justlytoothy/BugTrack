import ActionButton from './actionbutton';
import ErrorPageComponent from './errorPageComponent';
import Footer from './footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, fab, far);

const common = { ActionButton, ErrorPageComponent, FontAwesomeIcon, Footer };

export default common;
