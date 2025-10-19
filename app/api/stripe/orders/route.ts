import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";

export async function GET() {
  try {
    const payments = await stripe.paymentIntents.list({ limit: 10 });
    return NextResponse.json(payments.data);
  } catch (error) {
    console.error(error);

    const errorMessage = error instanceof Error ? error.message : "Bir hata oluştu"

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
