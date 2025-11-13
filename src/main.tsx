import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import SavedProvider from "./providers/SavedProvider.tsx";
import { SettingsProvider } from "./providers/SettingsProvider.tsx";
import { UserProvider } from "./providers/UserProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<SavedProvider>
					<UserProvider>
						<SettingsProvider>
						            <App />
						</SettingsProvider>
					</UserProvider>
			</SavedProvider>
		</BrowserRouter>
	</StrictMode>
);
