module.exports = {
    reactStrictMode: true,
    images: { domains: ['https://lh3.googleusercontent.com', 'lh3.googleusercontent.com'] },
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,

    }
}