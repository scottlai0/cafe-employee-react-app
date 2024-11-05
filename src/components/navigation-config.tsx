import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import BadgeIcon from '@mui/icons-material/Badge';

import { Navigation } from '@toolpad/core/AppProvider';


const NAVIGATION: Navigation = [
	{
		kind: 'header',
		title: 'Navigation',
	},
	{
		segment: 'cafe-employee-react-app/cafes',
		title: 'Cafes',
		icon: <LocalCafeIcon />,
	},
	{
		segment: 'cafe-employee-react-app/employees',
		title: 'Employees',
		icon: <BadgeIcon />,
	},
	{
		kind: 'divider',
	}
];

export default NAVIGATION