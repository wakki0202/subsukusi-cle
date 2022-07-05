import { useEffect, useState, useCallback } from "react";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
  Button,
  RadioButton,
  Stack,
  Subheading,
  FormLayout, TextField,
  Select, Frame, Navigation, Layout
} from "@shopify/polaris";
import { HomeMinor, OrdersMinor, ProductsMinor } from "@shopify/polaris-icons";
import { Toast, useAppBridge } from "@shopify/app-bridge-react";
import { gql, useMutation } from "@apollo/client";

import { userLoggedInFetch } from "../App";


const PRODUCTS_QUERY = gql`
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        title
      }
    }
  }
`;

export function ProductsCard() {
  const [populateProduct, { loading }] = useMutation(PRODUCTS_QUERY);
  const [productCount, setProductCount] = useState(0);
  const [hasResults, setHasResults] = useState(false);

  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const updateProductCount = useCallback(async () => {
    const { count } = await fetch("/products-count").then((res) => res.json());
    setProductCount(count);
  }, []);

  useEffect(() => {
    updateProductCount();
  }, [updateProductCount]);

  const toastMarkup = hasResults && (
    <Toast
      content="5 products created!"
      onDismiss={() => setHasResults(false)}
    />
  );



  const [value, setValue] = useState('disabled');

  const handleChange = useCallback(
    (_checked, newValue) => setValue(newValue),
    [],
  );

  function handleClick(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  const [selected, setSelected] = useState("today");

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    { label: "日", value: "日" },
    { label: "週", value: "週" },
    { label: "月", value: "月" },
    { label: "年", value: "年" },
  ];

  return (
    <>
    
      <Layout>
      <Layout.Section>
      <Frame>
        <Navigation location="/">
          <Navigation.Section
            items={[
              {
                url: "/",
                label: "Home",
                icon: HomeMinor,
              },
              {
                url: "/path/to/place",
                label: "Orders",
                icon: OrdersMinor,
                badge: "15",
              },
              {
                url: "/path/to/place",
                label: "Products",
                icon: ProductsMinor,
              },
            ]}
          />
        </Navigation>
        </Frame>
      </Layout.Section>
        <Layout.Section secondary>
      {toastMarkup}
      <Heading element="h2">プランの作成</Heading>
      <Heading element="h2">プランのグループ</Heading>
      <Subheading>プラングループ単位で商品に設定します。</Subheading>

      <Card title="プランの作成" sectioned>
        <FormLayout>
          <TextField label="プラングループタイトル" onChange={() => { }} autoComplete="off" />
          <Subheading>管理画面上で表示されるタイトルを入力してください</Subheading>

          <TextField
            type="email"
            label="公開タイトル"
            onChange={() => { }}
            autoComplete="email"
          />
          <Subheading>商品詳細ページ上でお客様に表示される定期購買のプラン名を入力してください。</Subheading>
        </FormLayout>
        
          <Stack vertical>
            <RadioButton
              label="１ヶ月ごと"
              checked={value === 'disabled'}
              id="disabled"
              name="accounts"
              onChange={handleChange}
            />
            <RadioButton
              label="３ヶ月ごと"
              id="optional"
              name="accounts"
              checked={value === 'optional'}
              onChange={handleChange}
            />
          </Stack>

          
          <Button onClick={handleClick}>
            期間を変更する
        </Button>
        <TextContainer spacing="loose">
          <Heading element="h4">
            TOTAL PRODUCTS
            <DisplayText size="medium">
              <TextStyle variation="strong">{productCount}</TextStyle>
            </DisplayText>
          </Heading>

          <Button
            primary
            loading={loading}
            onClick={() => {
              Promise.all(
                Array.from({ length: 5 }).map(() =>
                  populateProduct({
                    variables: {
                      input: {
                        title: randomTitle(),
                      },
                    },
                  })
                )
              ).then(() => {
                updateProductCount();
                setHasResults(true);
              });
            }}
          >
            Populate 5 products
          </Button>
          

        </TextContainer>
      </Card>
      <Card title="プランの作成" sectioned>
        <FormLayout>
          <TextField label="プラン" onChange={() => { }} autoComplete="off" />
          <Subheading>購入の間隔がわかるように書くことをおすすめしています。</Subheading>

        </FormLayout>

        <FormLayout label="">
          購入の間隔
          <FormLayout.Group >
            
            <TextField
              type="number"
              label=""
              onChange={() => { }}
              autoComplete="off"
            />
            <TextField
              onChange={() => { }}
              autoComplete="off"
            />
          </FormLayout.Group>
        </FormLayout>


      

        <Select
          label="Date range"
          options={options}
          onChange={handleSelectChange}
          value={selected}
        />


        <Button onClick={handleClick}>
          期間を変更する
        </Button>
        <TextContainer spacing="loose">
       

        </TextContainer>
        </Card>
        </Layout.Section>
    </Layout>
    </>
  );
}

function randomTitle() {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];

  return `${adjective} ${noun}`;
}

const ADJECTIVES = [
  "まぬけな",
  "りゅうき"
];

const NOUNS = [
  "坂本"
];
