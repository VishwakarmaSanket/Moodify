import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes.jsx";
import "./features/shared/style/global.scss";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { SongProvider } from "./features/home/song.context.jsx";

function App() {
  return (
    <AuthProvider>
      <SongProvider>
        <RouterProvider router={router} />
      </SongProvider>
    </AuthProvider>
  );
}

export default App;
