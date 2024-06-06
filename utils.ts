import creditCardType, { types as CardType } from "credit-card-type";
export function inferCreditCardVendor(cardNumber: string) {
  const result = creditCardType(cardNumber).filter((c) =>
    [CardType.MASTERCARD, CardType.MAESTRO, CardType.MIR, CardType.VISA].find(
      (v) => v === c.type
    )
  );

  if (result.length === 0) {
    return;
  }

  switch (result[0].type) {
    case CardType.MASTERCARD:
      return "MASTERCARD";
    case CardType.MAESTRO:
      return "MAESTRO";
    case CardType.MIR:
      return "MIR";
    case CardType.VISA:
      return "VISA";
  }
}

export function areSetsEqual<T>(a: Set<T>, b: Set<T>) {
  return a.size === b.size && [...a].every((value) => b.has(value));
}

export function arrayIncludes<A>(a: A[], b: A[]) {
  return b.every((v) => a.includes(v));
}
