import type { CryptoAsset } from './model';

export const sampleAssets: CryptoAsset[] = [
  {
    id: 'asset-edge-tls',
    name: 'Public API Gateway TLS',
    owner: 'Platform Engineering',
    environment: 'production',
    algorithm: 'ecc',
    keySize: 256,
    protocol: 'tls',
    dataShelfLifeYears: 7,
    exposure: 'public-internet',
    rotationDays: 398,
    vendorReady: true,
    compensatingControls: ['WAF', 'certificate automation']
  },
  {
    id: 'asset-code-signing',
    name: 'Release Code Signing Chain',
    owner: 'DevSecOps',
    environment: 'production',
    algorithm: 'rsa',
    keySize: 3072,
    protocol: 'code-signing',
    dataShelfLifeYears: 15,
    exposure: 'partner',
    rotationDays: 730,
    vendorReady: false,
    compensatingControls: ['HSM-backed keys']
  },
  {
    id: 'asset-mesh',
    name: 'Service Mesh mTLS Pilot',
    owner: 'Cloud Platform',
    environment: 'staging',
    algorithm: 'hybrid',
    protocol: 'tls',
    dataShelfLifeYears: 3,
    exposure: 'internal',
    rotationDays: 30,
    vendorReady: true,
    compensatingControls: ['short-lived workload identity', 'policy-as-code']
  },
  {
    id: 'asset-vpn',
    name: 'Partner VPN Key Exchange',
    owner: 'Network Security',
    environment: 'third-party',
    algorithm: 'ecc',
    keySize: 384,
    protocol: 'vpn',
    dataShelfLifeYears: 10,
    exposure: 'partner',
    rotationDays: 540,
    vendorReady: false,
    compensatingControls: ['network allowlisting']
  }
];
