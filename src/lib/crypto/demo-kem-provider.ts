import type { EncapsulationResult, KemKeyPair, KemProvider } from './kem-provider';

function getCrypto(): Crypto {
  if (!globalThis.crypto?.getRandomValues || !globalThis.crypto?.subtle) {
    throw new Error('Web Crypto API is required for the demo provider.');
  }

  return globalThis.crypto;
}

async function digest(...parts: Uint8Array[]): Promise<Uint8Array> {
  const length = parts.reduce((sum, part) => sum + part.byteLength, 0);
  const input = new Uint8Array(length);
  let offset = 0;

  for (const part of parts) {
    input.set(part, offset);
    offset += part.byteLength;
  }

  return new Uint8Array(await getCrypto().subtle.digest('SHA-256', input));
}

export class DemoKemProvider implements KemProvider {
  readonly name = 'DEMO-KEM-SHA256';
  readonly securityLevel = 1 as const;

  async generateKeyPair(): Promise<KemKeyPair> {
    const privateKey = new Uint8Array(32);
    getCrypto().getRandomValues(privateKey);
    const publicKey = await digest(privateKey);
    return { publicKey, privateKey };
  }

  async encapsulate(publicKey: Uint8Array): Promise<EncapsulationResult> {
    const ephemeral = new Uint8Array(32);
    getCrypto().getRandomValues(ephemeral);

    return {
      ciphertext: ephemeral,
      sharedSecret: await digest(publicKey, ephemeral)
    };
  }

  async decapsulate(ciphertext: Uint8Array, privateKey: Uint8Array): Promise<Uint8Array> {
    const publicKey = await digest(privateKey);
    return digest(publicKey, ciphertext);
  }
}

export const demoKemProvider = new DemoKemProvider();
