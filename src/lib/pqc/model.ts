export type AlgorithmFamily = 'rsa' | 'ecc' | 'ml-kem' | 'ml-dsa' | 'slh-dsa' | 'hybrid';

export type CryptoAsset = {
  id: string;
  name: string;
  owner: string;
  environment: 'production' | 'staging' | 'development' | 'third-party';
  algorithm: AlgorithmFamily;
  keySize?: number;
  protocol: 'tls' | 'ssh' | 'code-signing' | 'jwt' | 'vpn' | 'database' | 'kms' | 'other';
  dataShelfLifeYears: number;
  exposure: 'internal' | 'partner' | 'public-internet';
  rotationDays: number;
  vendorReady: boolean;
  compensatingControls: string[];
};

export type RiskBand = 'low' | 'medium' | 'high' | 'critical';

export type RiskAssessment = {
  assetId: string;
  score: number;
  band: RiskBand;
  drivers: string[];
  recommendedAction: string;
};

export type MigrationWave = {
  name: string;
  objective: string;
  assetIds: string[];
  exitCriteria: string[];
};
