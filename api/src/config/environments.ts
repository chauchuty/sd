const environments = {
    development: {
        api: {
            host: 'localhost',
            port: 24000
        }
    },

    production: {
        api: {
            host: '51.81.87.67',
            port: 24000
        }
    }
}

export default environments.development // Development or Production