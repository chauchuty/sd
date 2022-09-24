const environments = {
    development: {
        api: {
            host: 'localhost',
            port: 8082
        }
    },

    production: {
        api: {
            host: '',
            port: 0
        }
    }
}

export default environments.development // Development or Production