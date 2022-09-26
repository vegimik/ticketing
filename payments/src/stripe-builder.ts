import Stripe from "stripe";

class StripeBuilder {
  private stripeClient: Stripe;
  private key: string;
  constructor(key: string) {
    this.key = key;
    this.stripeClient = new Stripe(key, {
      // @ts-ignore
      apiVersion: "2020-08-27",
    });
  }

  public getStripeClient() {
    return this.stripeClient;
  }

  public createCharge(
    amount: number,
    currency: string,
    source: string,
    description?: string
  ) {
    return this.stripeClient.charges.create({
      amount,
      currency,
      source,
      description:
        description ||
        "My First Test Charge (created for API docs at https://www.stripe.com/docs/api)",
    });
  }
}

export const StripeBuilderClient = new StripeBuilder(process.env.STRIPE_KEY!);
