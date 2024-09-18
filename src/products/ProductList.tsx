import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ImageField,
  NumberInput,
  TextInput,
  FilterForm,
  FilterButton,
  CreateButton,
  SelectInput,
} from "react-admin";

import { Stack } from "@mui/material";

const productFilters = [
  <TextInput label="Title" source="title" />,
  <NumberInput label="Price Min" source="priceMin" />,
  <NumberInput label="Price Max" source="priceMax" />,
  <SelectInput
    source="state"
    choices={[
      { id: "good", name: "good" },
      { id: "average", name: "average" },
      { id: "bad", name: "bad" },
    ]}
  />,
];

const ProductToolbar = () => (
  <Stack direction="row" justifyContent="space-between">
    <FilterForm filters={productFilters} />
    <div>
      <FilterButton filters={productFilters} />
      <CreateButton />
    </div>
  </Stack>
);

const ProductList = () => (
  <List>
    <ProductToolbar />
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" label="Titre" />
      <TextField source="description" label="Description" />
      <NumberField source="price" label="Prix" />
      <TextField source="state" label="Etat" />
      {/* <ImageField
        source="photoUrl"
        title="photoUrl"
        sx={{ "& img": { maxWidth: 80, maxHeight: 80, objectFit: "contain" } }}
      /> */}
    </Datagrid>
  </List>
);
export default ProductList;
