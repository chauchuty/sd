class Protocol {
    private operacao: string
    private params: any

    constructor(operacao: string, params: any) {
        this.operacao = operacao
        this.params = params
    }
}

export default Protocol;