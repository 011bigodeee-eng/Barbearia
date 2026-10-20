import { NextResponse } from "next/server";
export function GET() {
  return NextResponse.json({
    ready: false,
    preview: true,
    message: "Prévia de design. Reservas reais não estão habilitadas.",
  });
}
export function POST() {
  return NextResponse.json(
    { message: "Esta é uma prévia. Nenhuma reserva foi criada." },
    { status: 403 },
  );
}
