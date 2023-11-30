import React from "react";
import { AppProps } from "next/app";
import type { NextPage } from "next";
import { Refine, GitHubBanner } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/nextjs-router";

import dataProvider, { GraphQLClient } from "@refinedev/hasura";
import { appWithTranslation, useTranslation } from "next-i18next";
import { Layout } from "@components/layout";
import "@styles/global.css";
import { authProvider } from "src/authProvider";
import "../dist/output.css";

const client = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT!}/v1/graphql`,
  {
    headers: {
      "x-hasura-admin-secret":
        process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET!,
    },
  }
);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        {/* <DevtoolsProvider> */}
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(client)}
          authProvider={authProvider}
          i18nProvider={i18nProvider}
          resources={[
            {
              name: "capablweb_power_bi",
              list: "/capablweb_power_bi",
              create: "/capablweb_power_bi/create",
              edit: "/capablweb_power_bi/edit/:id",
              meta: {
                canDelete: true,
                canEdit: true,
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
            projectId: "jh5trS-2fFqPA-9KtOvH",
          }}
        >
          {renderComponent()}
          <RefineKbar />
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
        {/* <DevtoolsPanel /> */}
        {/* </DevtoolsProvider> */}
      </RefineKbarProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
