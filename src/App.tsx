import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import customDataProvider from "./dataProvider";
import Product from "./products";

export const App = () => (
  <Admin layout={Layout} dataProvider={customDataProvider}>
    <Resource name="products" list={Product.list} show={Product.show} />
  </Admin>
);
