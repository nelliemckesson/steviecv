import Resume from "../components/Resume";

export default function Home() {
  return (
    <div className="">
      <main className="main-container">
        <Resume />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Footer</p>
      </footer>
    </div>
  );
}
