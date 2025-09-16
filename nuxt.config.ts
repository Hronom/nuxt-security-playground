// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['nuxt-security'],

    security: {
        enabled: true,
        strict: true,
        headers: {
            crossOriginEmbedderPolicy: 'credentialless',
            contentSecurityPolicy: {
                'img-src': ["'self'", 'data:', 'blob:', 'https:'],
                'media-src': ["'self'", 'data:', 'blob:', 'https:'],
                'font-src': ["'self'", 'data:', 'https:'],
                'style-src': ["'self'", "'unsafe-inline'", 'data:', 'https:'],
            },
        },

        corsHandler: {
            // https://nuxt-security.vercel.app/middleware/cors-handler#origin
            origin: 'http://superfish:3000',
            useRegExp: false,
            credentials: true,
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            preflight: {statusCode: 204},
        },
        // This installs and configures nuxt-csurf under the hood
        csrf: false
        // csrf: {
        //     https: process.env.NODE_ENV === 'production',
        //     cookie: {
        //         path: '/',
        //         httpOnly: true,
        //         sameSite: 'strict',
        //     },
        //     methodsToProtect: ['POST', 'PUT', 'PATCH', 'DELETE'],
        //     headerName: 'csrf-token',
        //     // Make CSRF token available on server event context for tests/utilities
        //     addCsrfTokenToEventCtx: true,
        // },
    },
})