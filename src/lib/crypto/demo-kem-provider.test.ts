import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { toHex } from './kem-provider.ts';
import { demoKemProvider } from './demo-kem-provider.ts';

describe('demoKemProvider', () => {
  it('round-trips encapsulation with matching shared secrets', async () => {
    const keys = await demoKemProvider.generateKeyPair();
    const encapsulated = await demoKemProvider.encapsulate(keys.publicKey);
    const recovered = await demoKemProvider.decapsulate(
      encapsulated.ciphertext,
      keys.privateKey
    );

    assert.equal(toHex(recovered), toHex(encapsulated.sharedSecret));
    assert.equal(keys.publicKey.byteLength, 32);
  });
});
