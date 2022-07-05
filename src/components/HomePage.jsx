import {
  EmptyState,
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";

import trophyImgUrl from "../assets/home-trophy.png";

import { ProductsCard } from "./ProductsCard";

export function HomePage() {
  return (
    <Page fullWidth>
      <Layout>
        
        <Layout.Section >
          <ProductsCard />
        </Layout.Section>
        
      </Layout>
    </Page>
  );
}
