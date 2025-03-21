import { getBoxDetails } from "@/services/box";
import Form from "./form";
export default async function EditPage({ params }: any) {
  const { id } = await params;
  const res = await getBoxDetails(id);
  return (
    <div className="py-10 px-5">
      <Form data={res.data}></Form>
    </div>
  );
}
