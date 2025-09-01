import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { DeviceManagementPage } from "./components/DeviceManagementPage";
import { ProfileLayout } from "./components/ProfileLayout";
import { ProfileBasic } from "./components/ProfileBasic";
import { ProfileHwInput } from "./components/ProfileHwInput";
import { ProfileAccounts } from "./components/ProfileAccounts";
import { ProfileSystem } from "./components/ProfileSystem";
import { HistoryLayout } from "./components/HistoryLayout";
import { HistoryRecordsPage } from "./components/HistoryRecordsPage";
import { DataAnalyticsPanel } from "./components/DataAnalyticsPanel";
import { CollectionLayout } from "./components/CollectionLayout";
import { CollectionNormal } from "./components/CollectionNormal";
import { CollectionBackfill } from "./components/CollectionBackfill";

// App component now uses a cleaner routing structure with MainLayout

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route path="collection/*" element={<CollectionLayout />}>
            <Route index element={<CollectionNormal />} />
            <Route path="backfill" element={<CollectionBackfill />} />
          </Route>
          <Route path="profile/*" element={<ProfileLayout />}>
            <Route index element={<ProfileBasic />} />
            <Route path="hw-input" element={<ProfileHwInput />} />
            <Route path="accounts" element={<ProfileAccounts />} />
            <Route path="system" element={<ProfileSystem />} />
          </Route>
          <Route path="statistics/*" element={<HistoryLayout />}>
            <Route index element={<HistoryRecordsPage />} />
            <Route path="analytics" element={<DataAnalyticsPanel />} />
          </Route>
          <Route path="devices" element={<DeviceManagementPage />} />
          <Route path="" element={<Navigate to="/collection" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}