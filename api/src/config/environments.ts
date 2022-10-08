const environments = {
    development: {
        api: {
            host: 'localhost',
            port: 8082
        }
    },

    production: {
        api: {
            host: '51.81.87.67',
            port: 8082
        }
    }
}

export default environments.development // Development or Production