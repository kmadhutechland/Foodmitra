import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LegalPage from "./pages/LegalPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="terms-condition"
          element={
            <LegalPage
              title="Terms and Conditions"
              content="Food Mithra provides a price-transparent food ordering experience by listing menu-aligned outlet prices. Final order value may vary if vendors update rates, availability, or taxes at source."
            />
          }
        />
        <Route
          path="privacy-policy"
          element={
            <LegalPage
              title="Privacy Policy"
              content="We collect only operational data required for delivery, support, and partner onboarding. Information is used for service quality, protected with controlled access, and never shared beyond required operations."
            />
          }
        />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}