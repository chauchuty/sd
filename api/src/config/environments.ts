const environments = {
    development: {
        api: {
            host: 'localhost',
            port: 8082
        }
    },

    production: {
        api: {
            host: '10.20.8.91',
            port: 22000
        }
    }
}

export default environments.production 