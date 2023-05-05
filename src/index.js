import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RTLLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode> 
      <ThemeEditorProvider>
        <HashRouter>
          <Routes>
              <Route path="/auth/*" element={<AuthLayout />} />
              <Route path="/admin/*" element={<AdminLayout />} />
              <Route path="*" element={<Navigate to='/auth/login' />} />
            </Routes>
        </HashRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
