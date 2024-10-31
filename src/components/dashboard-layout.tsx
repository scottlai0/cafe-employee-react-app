import { extendTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Box } from "@mui/material";
import NAVIGATION from './navigation-config';

const theme = extendTheme({
	colorSchemes: { light: true, dark: true },
	colorSchemeSelector: 'class',
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 600,
			lg: 1200,
			xl: 1536,
		},
	},
});
  
const branding = {
	logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
	title: 'Cafe Employee Management',
}


type WrapperComponentProps = {
	children: React.ReactNode
}
  

const DashboardLayoutComponent: React.FC<WrapperComponentProps> = ({ children }) => {
	return (
		<AppProvider
			navigation={NAVIGATION}
			theme={theme}
			branding={branding}
		>
			<DashboardLayout>
				<Box sx={{ p: 3 }}>
					{ children }
				</Box>
			</DashboardLayout>
		</AppProvider>
	)
}

export default DashboardLayoutComponent