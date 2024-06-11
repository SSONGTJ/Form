import { title } from "@/components/primitives";
import QuestTable from "@/components/quest-table";

async function fetchApiCall() {
  console.log("fetchApiCall called");
  const res = await fetch(`${process.env.BASE_URL}/api/quest`, {
    cache: "no-store",
  });

  const contentTypeHeaderValue = res.headers.get("content-type");

  if (contentTypeHeaderValue?.includes("text/html")) {
    return null;
  }

  return res.json();
}

export default async function FormPage() {
  const response = await fetchApiCall();

  const fetchedQuest = response?.data ?? [];

  return (
    <div className="flex flex-col space-y-8">
      <h1 className={title()}>폼 만들기</h1>
      <QuestTable quests={fetchedQuest}/>
    </div>
  );
}
