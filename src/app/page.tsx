import HomeTemplate from "@/design-system/template/home-template";

export default function Home() {
  return (
    <main className="flex w-full h-[calc(100%-68px)] flex-col items-center justify-between">
      <HomeTemplate />
    </main>
  );
}
