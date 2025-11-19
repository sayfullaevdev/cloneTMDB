import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SavedProvider from "./providers/SavedProvider.tsx";
import { SettingsProvider } from "./providers/SettingsProvider.tsx";
import { UserProvider } from "./providers/UserProvider.tsx";
import { TrailerProvider } from "./context/TrailerContext.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<SavedProvider>
				<UserProvider>
					<SettingsProvider>
						<TrailerProvider>
							<App />
						</TrailerProvider>
					</SettingsProvider>
				</UserProvider>
			</SavedProvider>
		</Provider>
	</StrictMode>
);
