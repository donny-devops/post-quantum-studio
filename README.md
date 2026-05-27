🚀 Overview
Post-Quantum Studio is a reference implementation and sandbox for NIST FIPS 203/204/205 post-quantum cryptographic (PQC) algorithms. It provides:
- Standard-compliant PQC primitives (ML-KEM, ML-DSA, SLH-DSA).
- Migration tooling to transition classical systems to quantum-resistant schemes.
- Hybrid TLS patterns for seamless integration with existing infrastructure.
- Agentic automation for testing, benchmarking, and compliance validation.
Designed for security engineers, cryptographers, and developers preparing for the post-quantum transition.
🔧 Features
📜 NIST FIPS 203/204/205 Algorithms
StandardAlgorithmUse CaseStatus
FIPS 203ML-KEMKey Encapsulation
✅ Implemented
FIPS 204ML-DSADigital Signatures
✅ Implemented
FIPS 205SLH-DSAStateless Hash-Based Signatures
✅ Implemented
🛠️ Migration Tooling
- Automated code analysis for PQC readiness.
- Hybrid scheme generators (e.g., X25519 + ML-KEM).
- API wrappers for drop-in replacement of classical crypto (e.g., OpenSSL, Libsodium).
🔗 Hybrid TLS Patterns
- TLS 1.3 + PQC handshake simulations.
- Certificate transparency for PQC certificates.
- Performance benchmarks for hybrid vs. classical schemes.
🤖 Agentic Workflows
- CI/CD pipelines for PQC compliance testing.
- Fuzzing agents for edge-case validation.
- Policy enforcement (e.g., "No classical ECDSA in production").
🏗️ Architecture
graph TD
    A[Core] --> B[PQC Primitives]
    A --> C[Migration Tools]
    A --> D[Hybrid TLS]
    B --> B1[ML-KEM]
    B --> B2[ML-DSA]
    B --> B3[SLH-DSA]
    C --> C1[Code Analyzer]
    C --> C2[Hybrid Scheme Generator]
    D --> D1[TLS 1.3 + PQC]
    D --> D2[Benchmarking]
- Language: Rust (for performance/correctness) + WASM (for web integration).
- Dependencies:
- LibOQS (PQC implementations).
- Tokio (async runtime for agents).
- OpenSSL (hybrid TLS prototypes).
📦 Installation
Prerequisites
- Rust (>= 1.70) + cargo
- Python 3.10+ (for tooling scripts)
- Docker (for sandboxed testing)
Build
git clone https://github.com/your-org/post-quantum-studio
cd post-quantum-studio
cargo build --release
Run the Studio
# Start the agentic OS
cargo run --bin pq-studio
# Or launch a hybrid TLS server
cargo run --bin hybrid-tls-server -- --port 4433
🧪 Usage Examples
1. Generate a Hybrid Key Pair (ML-KEM + X25519)
use pq_studio::hybrid::kem;
let (pk, sk) = kem::generate_keypair();
let (ct, ss) = kem::encapsulate(&pk);
let ss_decapsulated = kem::decapsulate(&sk, &ct);
assert_eq!(ss, ss_decapsulated);
2. Test TLS 1.3 + PQC Handshake
# Terminal 1: Start server
cargo run --bin hybrid-tls-server
# Terminal 2: Connect with client
cargo run --bin hybrid-tls-client -- --host localhost --port 4433
3. Run Migration Analysis
python3 scripts/analyze_pqc_readiness.py --target ./your_classical_codebase
📊 Benchmarks
AlgorithmKeyGen (ms)Sign (ms)Verify (ms)Handshake (ms)
ML-KEM-7680.45——12.2
ML-DSA-651.22.13.0—
Hybrid (X25519 + ML-KEM)
0.55——15.8
Benchmark environment: Intel i9-13900K, Rust --release mode.
🔒 Security & Compliance
- FIPS 203/204/205: All primitives are NIST-approved and audit-ready.
- Side-Channel Resistance: Constant-time implementations for all operations.
- Fuzzing: Integrated with cargo-fuzz for robustness testing.
🤝 Contributing
 1. Fork the repo and create a feature branch.
 2. Test with cargo test --all-features.
 3. Document new features in /docs.
 4. Submit a PR with a clear description and conventional commits.
📜 License
Apache 2.0 – Permissive for commercial use, with attribution.
🆘 Support
- Issues: GitHub Issues
- Discussions: GitHub Discussions
- Email: pq-studio@your-org.com
🚀 Roadmap
MilestoneTarget Date
Status
FIPS 206 Support
Q3 2026🟡 Planned
Hardware Acceleration
Q4 2026🟡 Planned
WASM Web Demo
Q2 2026🟢 In Progress
Built with ❤️ by Adonis Jimenez for the quantum-resistant future.
