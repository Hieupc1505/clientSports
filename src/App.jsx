import { Fragment } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRouters } from "./routers";
import { DefaultLayout } from "./components/Layout";
import Football from "./Pages/Football";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {publicRouters.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Football
                                            path={route.path}
                                            page={Page}
                                        />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
