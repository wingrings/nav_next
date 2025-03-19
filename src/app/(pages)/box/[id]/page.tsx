import { getBoxDetails } from "@/services/box";
import Form from "./form";
export default async function EditPage({ params }: any) {
  const { id } = await params;
  const res = await getBoxDetails(id);
  return (
    <div className="text-center">
      {JSON.stringify(res.data)}
      <Form data={res.data}></Form>
    </div>
  );
}
