class GeneralPreferences {
    private entity: string

    constructor(entity: string) {
        this.entity = entity
    }

    protected logger(message: string){
        console.log(`[${new Date().toLocaleTimeString()}] [${this.entity}]- ${message}`)
    }
}

export default GeneralPreferences