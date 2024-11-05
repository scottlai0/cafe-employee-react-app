import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import BadgeIcon from '@mui/icons-material/Badge';

import { Navigation } from '@toolpad/core/AppProvider';


const NAVIGATION: Navigation = [
	{
		kind: 'header',
		title: 'Navigation',
	},
	{
		segment: 'cafes',
		title: 'Cafes',
		icon: <LocalCafeIcon />,
	},
	{
		segment: 'employees',
		title: 'Employees',
		icon: <BadgeIcon />,
	},
	{
		kind: 'divider',
	}
];

export default NAVIGATION