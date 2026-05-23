export type EncapsulationResult = {
  ciphertext: Uint8Array;
  sharedSecret: Uint8Array;
};

export type KemKeyPair = {
  publicKey: Uint8Array;
  privateKey: Uint8Array;
};

export interface KemProvider {
  readonly name: string;
  readonly securityLevel: 1 | 3 | 5;
  generateKeyPair(): Promise<KemKeyPair>;
  encapsulate(publicKey: Uint8Array): Promise<EncapsulationResult>;
  decapsulate(ciphertext: Uint8Array, privateKey: Uint8Array): Promise<Uint8Array>;
}

export function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('');
}
