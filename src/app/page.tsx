import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { data } from "@/service/data";

export default function Home() {
  return (
    <Card className="min-h-screen grid place-items justify-center">
      <pre className="">{data}</pre>
      <Button className="cursor-pointer">Processar</Button>
    </Card>
  );
}
