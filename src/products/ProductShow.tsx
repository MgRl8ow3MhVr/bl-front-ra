import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  NumberField,
  ImageField,
} from "react-admin";

const ProductShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" />
      <TextField source="description" />
      <NumberField source="price" />
      <DateField label="Publication date" source="published_at" />
      <ImageField
        source="photoUrl"
        title="photoUrl"
        sx={{ "& img": { maxWidth: 80, maxHeight: 80, objectFit: "contain" } }}
      />
    </SimpleShowLayout>
  </Show>
);

export default ProductShow;
