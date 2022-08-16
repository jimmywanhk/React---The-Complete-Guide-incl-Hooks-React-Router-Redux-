import React, { Suspense, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

//import AllQuotes from "./pages/AllQuotes";
//import QuoteDetail from "./pages/QuoteDetail";
//import NewQuote from "./pages/NewQuote";
import Layout from "./components/layout/Layout";
//import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import AuthContext from "./store/auth-context";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UserProfile from "./components/Profile/UserProfile";

const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Layout>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <Switch>
            {/* <Route path="/" exact>
              <HomePage />
            </Route> */}
            {!authCtx.isLoggedIn && (
              <Route path="/auth">
                <AuthPage />
              </Route>
            )}
            <Route path="/profile">
              {authCtx.isLoggedIn && <UserProfile />}
              {!authCtx.isLoggedIn && <Redirect to="/auth" />}
            </Route>

            <Route path="/" exact>
              <Redirect to="/quotes" />
            </Route>

            <Route path="/quotes" exact>
              <AllQuotes />
            </Route>

            <Route path="/quotes/:quoteId">
              <QuoteDetail />
            </Route>

            <Route path="/new-quote">
              <NewQuote />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
