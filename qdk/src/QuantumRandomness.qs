namespace PostQuantumStudio.Research {
    @EntryPoint()
    operation QuantumRandomBit() : Result {
        use q = Qubit();
        H(q);
        let result = M(q);
        Reset(q);
        return result;
    }
}
