import { getBoxDetails } from "@/services/box";
import Form from "./form";
export default async function Page() {
  const res = await getBoxDetails(1);
  return (
    <div className="text-center">
      {JSON.stringify(res.data)}
      <Form data={res.data}></Form>
    </div>
  );
}
