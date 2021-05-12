import { Box, IconButton, useColorMode, Flex, Spacer } from '@chakra-ui/react';
import { MoonIcon, SunIcon, CloseIcon } from '@chakra-ui/icons';

const Theme = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Flex>
			<Box textAlign="right" py={4} marginLeft={5}>
				<Spacer />
				<Box textAlign="right" py={4} marginRight={5}>
					<IconButton
						icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						onClick={toggleColorMode}
						variant="ghost"
						aria-label="theme"
					/>
				</Box>
			</Box>
		</Flex>
	);
};

export default Theme;
