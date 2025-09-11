export default interface ClientGenerator {
    getNewClient(): { clientId: string, clientSecret: string }
}