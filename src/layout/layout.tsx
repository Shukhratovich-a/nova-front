import { FunctionComponent } from "react";
import dynamic from "next/dynamic";
import cn from "classnames";

import { LayoutProps } from "./layout.props";

import { SideBarProvider } from "@/contexts/sidebar.context";

import { Footer } from "./footer/footer.component";
import { FixedIcon } from "@/components";

import styles from "./layout.module.scss";

const Header = dynamic(() => import("./header/header"), { ssr: false });
const Sidebar = dynamic(() => import("./sidebar/sidebar"), { ssr: false });
const whatsappPhone = process?.env?.WHATSAPP_PHONE;

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper)}>
      <Header className={cn(styles.header)} />
      <Sidebar className={cn(styles.sidebar)} />

      <main className={cn(styles.main)}>
        {children}
        {whatsappPhone && <FixedIcon />}
      </main>

      <Footer className={cn(styles.footer)} />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <SideBarProvider isOpen={false}>
        <Layout>
          <Component {...props} />
        </Layout>
      </SideBarProvider>
    );
  };
};
