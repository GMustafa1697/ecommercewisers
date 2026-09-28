import { Container } from "@/components/ui/Container";

export default function Home() {
  return (
    <main id="main" className="flex flex-1 flex-col justify-center bg-background text-foreground">
      <Container className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">ecommercewisers</h1>
        <p className="text-muted">
          E-commerce development agency. Homepage in progress.
        </p>
      </Container>
    </main>
  );
}
