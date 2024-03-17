import { ThanksWidget } from '@thanksjs/react-native-webview';
import { View, Text } from 'react-native';

export default function App() {
	return (
		<>
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#000',
					width: '100%',
					height: '100%',
				}}
			>
				{new Array(100).fill(0).map((_, i) => (
					<Text key={i} style={{ color: '#FFF' }}>
						{new Array(4).fill(' Thanks ').join('')}
					</Text>
				))}
			</View>
			<ThanksWidget
				// FIXME: this is thanksjs own Id
				partnerId="2a37e310-e0a2-46d0-b46b-0c55f902c169"
				statusText="thanks for being awesome"
			/>
		</>
	);
}
