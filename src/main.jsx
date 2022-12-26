import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

// redux
import store from './redux/store.js';
import { Provider } from 'react-redux';

// Paypal
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<PayPalScriptProvider
				deferLoading={true}
			>
				<App />
			</PayPalScriptProvider>
		</Provider>
	</React.StrictMode>,
);
