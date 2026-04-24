import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";

type WebhookPayload = {
  _type: string;
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_WEBHOOK_SECRET;

    if (!secret) {
      console.error("SANITY_WEBHOOK_SECRET is not set");
      return NextResponse.json(
        { message: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: "Missing _type in payload" },
        { status: 400 }
      );
    }

    // Revalidate the tag matching the document type
    revalidateTag(body._type);
    // Also revalidate a global tag for catch-all invalidation
    revalidateTag("sanity");

    return NextResponse.json({
      status: 200,
      revalidated: true,
      type: body._type,
      now: Date.now(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Revalidate error:", message);
    return NextResponse.json({ message }, { status: 500 });
  }
}
